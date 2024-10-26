using ClinicAPI.Data;
using ClinicAPI.Interface;
using ClinicAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ClinicAPI.Repository
{
    public class AppointmentDateRepository: IAppointmentDateRepository
    {
        private readonly AppDbContext _context;

        public AppointmentDateRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AppointmentDate>> Get(string doctorId, DateTime date)
        {
            return await _context.AppointmentDate
                .Where(ad => ad.WorkSchedule.Date == date && ad.WorkSchedule.DoctorId == doctorId && ad.Appointment == null)
                .ToListAsync();
        }

        public async Task<AppointmentDate> Get(int id)
        {
            return await _context.AppointmentDate.Where(ad =>  ad.Id == id).FirstOrDefaultAsync();
        }
    }
}
