using ClinicAPI.Data;
using ClinicAPI.Dto;
using ClinicAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ClinicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<AppUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var user = await _userManager.FindByEmailAsync(registerDto.Email);

            if (user != null) { return BadRequest("Користувач з такою поштою вже існує"); }

            var patient = new Patient
            {
                Email = registerDto.Email,
                UserName = registerDto.Email,
                LastName = registerDto.LastName,
                MiddleName = registerDto.MiddleName,
                FirstName = registerDto.FirstName,
                PhoneNumber = registerDto.PhoneNumber,
                BirthDay = registerDto.BirthDay,
                isMale = registerDto.isMale,
                BloodType = registerDto.BloodType,
            };

            var result = await _userManager.CreateAsync(patient,registerDto.Password);

            if(!result.Succeeded) { return BadRequest(result.Errors); }

            result = await _userManager.AddToRoleAsync(patient, UserRoles.Patient);

            if(!result.Succeeded) { return BadRequest(result.Errors); }

            return Ok(new AuthResponseDto
            {
                IsSuccess = true,
                Message = "Обліковий запис успішно створено!"
            });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if(user == null) {
                return Unauthorized(new AuthResponseDto
                {
                    IsSuccess = false,
                    Message = "Користувача з цією електронною адресою не знайдено",
                });
            }

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result)
            {
                return Unauthorized(new AuthResponseDto
                {
                    IsSuccess = false,
                    Message = "Невірний пароль"
                });
            }

            var token = GenerateToken(user);
            var refreshToken = GenerateRefreshToken();
            _ = int.TryParse(_configuration.GetSection("JWTSetting").GetSection("RefreshTokenValidityIn").Value!, out int RefreshTokenValidityIn);
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddMinutes(RefreshTokenValidityIn);
            await _userManager.UpdateAsync(user);

            return Ok(new AuthResponseDto
            {
                Token = token,
                IsSuccess = true,
                Message = "Успішний вхід",
                RefreshToken = refreshToken
            });
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")]

        public async Task<ActionResult<AuthResponseDto>> RefreshToken(TokenDto tokenDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var principal = GetPrincipalFromExpiredToken(tokenDto.Token);
            var user = await _userManager.FindByEmailAsync(tokenDto.Email);

            if (principal == null || user == null || user.RefreshToken != tokenDto.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return BadRequest(new AuthResponseDto
                {
                    IsSuccess = false,
                    Message = "Недійсний запит клієнта"
                });
            }

            var newJwtToken = GenerateToken(user);
            var newRefreshToken = GenerateRefreshToken();
            _ = int.TryParse(_configuration.GetSection("JWTSetting").GetSection("RefreshTokenValidityIn").Value!, out int RefreshTokenValidityIn);

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddMinutes(RefreshTokenValidityIn);

            await _userManager.UpdateAsync(user);

            return Ok(new AuthResponseDto
            {
                IsSuccess = true,
                Token = newJwtToken,
                RefreshToken = newRefreshToken,
                Message = "Токен успішно оновлено"
            });
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
        {
            var tokenParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JwtSetting").GetSection("securityKey").Value!)),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenParameters, out SecurityToken securityToken);

            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Недійсний токен");

            return principal;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private string GenerateToken(AppUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII
            .GetBytes(_configuration.GetSection("JWTSetting").GetSection("securityKey").Value!);

            var roles = _userManager.GetRolesAsync(user).Result;

            List<Claim> claims =
            [
                new (JwtRegisteredClaimNames.Email,user.Email??""),
                new (JwtRegisteredClaimNames.Name,user.FirstName??""),
                new (JwtRegisteredClaimNames.NameId,user.Id ??""),
                new (JwtRegisteredClaimNames.Aud,
                _configuration.GetSection("JWTSetting").GetSection("validAudience").Value!),
                new (JwtRegisteredClaimNames.Iss,_configuration.GetSection("JWTSetting").GetSection("validIssuer").Value!)
            ];

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials( new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}