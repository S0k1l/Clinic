using ClinicAPI.Data;
using ClinicAPI.Dto;
using ClinicAPI.Interface;
using ClinicAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ClinicAPI.Repository
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly AppDbContext _context;

        public DoctorRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Doctor>> Filter(int specialtyId, string[] searchNameTerms)
        {
            return await _context.Doctors
                .Where(d =>
                (searchNameTerms.IsNullOrEmpty() || searchNameTerms.All(term =>
                    (d.FirstName + " " + (d.MiddleName ?? "") + " " + d.LastName).Contains(term)))
                && (specialtyId == 0 || d.SpecialtyId == specialtyId))
                .Include(d => d.Specialty)
                .ToListAsync();
        }

        public async Task<IEnumerable<Doctor>> GetAll()
        {
            return await _context.Doctors.Include(d => d.Specialty).ToListAsync();
        }

        public async Task<Doctor> GetById(string id)
        {
            return await _context.Doctors
                .Where(d => d.Id == id)
                .Include(d => d.Specialty)
                .FirstOrDefaultAsync();
        }
    }
}
