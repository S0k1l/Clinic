using ClinicAPI.Dto;
using ClinicAPI.Interface;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ClinicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecialtyController : ControllerBase
    {
        private readonly ISpecialtyRepository _specialtyRepository;

        public SpecialtyController(ISpecialtyRepository specialtyRepository)
        {
            _specialtyRepository = specialtyRepository;
        }

        // GET: api/<SpecialtyController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var specialty = await _specialtyRepository.GetAll();

            if (specialty == null) { return BadRequest(ModelState); }

            var specialtyDto = specialty.Select(s => new SpecialtyDto
            {
                Id = s.Id,
                Name = s.Name,                
            }).ToList();
            return Ok(specialtyDto);
        }
    }
}
