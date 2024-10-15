using Microsoft.AspNetCore.Identity;

namespace ClinicAPI.Models
{
    public class AppUser:IdentityUser
    {
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string FirstName { get; set; }
        public DateTime BirthDay { get; set; }
        public bool isMale { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}
