using ClinicAPI.Dto;
using ClinicAPI.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ClinicAPI.Controllers
{
    [Route("api/appointment-date")]
    [ApiController]
    public class AppointmentDateController : ControllerBase
    {
        private readonly IAppointmentDateRepository _appointmentDateRepository;

        public AppointmentDateController(IAppointmentDateRepository appointmentDateRepository)
        {
            _appointmentDateRepository = appointmentDateRepository;
        }

        // POST api/<WorkingHourController>
        [Authorize]
        [HttpPost()]
        public async Task<IActionResult> Get(AppointmentDateRequestDto appointmentDateRequestDto)
        {
            if(!ModelState.IsValid) { return BadRequest(ModelState); }

            var date = DateTime.Parse(appointmentDateRequestDto.Date);

            var appointmentDate = await _appointmentDateRepository.Get(appointmentDateRequestDto.DoctorId, date);

            var appointmentDateDto = new List<AppointmentDateDto>();

            if (appointmentDate == null) { return Ok(appointmentDateDto); }

            appointmentDateDto = appointmentDate.Select(wh => new AppointmentDateDto
            {
                Id = wh.Id,
                End = wh.End.ToShortTimeString(),
                Start = wh.Start.ToShortTimeString(),
            }).ToList();

            return Ok(appointmentDateDto);
        }
    }
}
