using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata.Ecma335;

namespace ClinicAPI.Models
{
    public class Doctor : AppUser
    {
        public int SpecialtyId { get; set; }
        public Specialty Specialty { get; set; }
        public string Room { get; set; }
        public string Education { get; set; }
        public DateTime EmployedSince { get; set; }
        public ICollection<MedicalRecord> MedicalRecords { get; set; }
        public ICollection<Appointment> Appointments { get; set; }

    }
}
