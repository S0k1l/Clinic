using ClinicAPI.Models;

namespace ClinicAPI.Interface
{
    public interface ISpecialtyRepository
    {
        Task<IEnumerable<Specialty>> GetAll();
    }
}
