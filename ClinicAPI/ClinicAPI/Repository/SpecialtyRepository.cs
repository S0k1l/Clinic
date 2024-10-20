using ClinicAPI.Data;
using ClinicAPI.Interface;
using ClinicAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ClinicAPI.Repository
{
    public class SpecialtyRepository : ISpecialtyRepository
    {
        private readonly AppDbContext _context;

        public SpecialtyRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Specialty>> GetAll()
        {
            return await _context.Specialtys.ToArrayAsync();
        }
    }
}
