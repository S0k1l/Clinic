using ClinicAPI.Models;

namespace ClinicAPI.Interface
{
    public interface IDoctorRepository
    {
        Task<IEnumerable<Doctor>> GetAll();
        Task<Doctor> GetById(string id);
        Task<IEnumerable<Doctor>> Filter(int specialtyId, string[] searchNameTerms);

    }
}
