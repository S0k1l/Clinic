using ClinicAPI.Data.Enum;

namespace ClinicAPI.Models
{
    public class Patient: AppUser
    {
        public BloodType BloodType { get; set; }
        public ICollection<MedicalRecord> MedicalRecords { get; set; }
        public ICollection<Appointment> Appointments { get; set; }
    }
}
