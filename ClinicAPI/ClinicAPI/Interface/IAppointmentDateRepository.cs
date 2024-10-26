using ClinicAPI.Models;

namespace ClinicAPI.Interface
{
    public interface IAppointmentDateRepository
    {
        Task<AppointmentDate> Get(int id);
        Task<IEnumerable<AppointmentDate>> Get(string doctorId, DateTime date);
    }
}
