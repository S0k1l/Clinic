using ClinicAPI.Dto;
using ClinicAPI.Interface;
using ClinicAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ClinicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorRepository _doctorRepository;

        public DoctorController(IDoctorRepository doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }

        // GET: api/<DoctorController>
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var docrors = await _doctorRepository.GetAll();

            var docrorsDto = new List<DoctorDto>();

            if (docrors == null) { return Ok(docrorsDto); }

            docrorsDto = docrors.Select(d => new DoctorDto
            {
                Id = d.Id,
                FullName = $"{d.LastName} {d.FirstName} {d.MiddleName}",
                SpecialtyName = d.Specialty.Name,
                ImgUrl = d.ImgUrl,
            }).ToList();
            return Ok(docrorsDto);
        }

        // GET api/<DoctorController>/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            if(id == null) { return BadRequest("Не вказаний Id"); }

            var doctor = await _doctorRepository.GetById(id);

            if(doctor == null) { return NotFound("Лікаря не знайдено"); }

            var doctorDetailsDto = new DoctorDetailsDto
            {
                Id = doctor.Id,
                FullName = $"{doctor.LastName} {doctor.FirstName} {doctor.MiddleName}",
                SpecialtyName = doctor.Specialty.Name,
                ImgUrl = doctor.ImgUrl,
                Room = doctor.Room,
                BirthDay = doctor.BirthDay,
                Education = doctor.Education,
                EmployedSince = doctor.EmployedSince,
            };

            return Ok(doctorDetailsDto);
        }

        // GET api/<DoctorController>/filter
        [AllowAnonymous]
        [HttpPost("filter")]
        public async Task<IActionResult> Filter(DoctorFilterDto doctorFilterDto)
        {
            if (doctorFilterDto.SpecialtyId < 0) { return BadRequest("Неправильно вказаний Id спеціальності"); }

            var searchNameTerms = doctorFilterDto.DoctorName?.Split(' ', StringSplitOptions.RemoveEmptyEntries);

            var docrors = await _doctorRepository.Filter(doctorFilterDto.SpecialtyId, searchNameTerms);

            var docrorsDto = new List<DoctorDto>();

            if (docrors.IsNullOrEmpty()) { return Ok(docrorsDto); }

            docrorsDto = docrors.Select(d => new DoctorDto
            {
                Id = d.Id,
                FullName = $"{d.LastName} {d.FirstName} {d.MiddleName}",
                SpecialtyName = d.Specialty.Name,
                ImgUrl = d.ImgUrl,
            }).ToList();
            return Ok(docrorsDto);

        }
    }
}
