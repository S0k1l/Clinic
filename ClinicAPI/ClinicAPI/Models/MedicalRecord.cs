using System.ComponentModel.DataAnnotations.Schema;

namespace ClinicAPI.Models
{
    public class MedicalRecord
    {
        public int Id { get; set; }

        public string DoctorId { get; set; }
        public Doctor Doctor { get; set; }
        public string PatientId { get; set; }
        public Patient Patient { get; set; }
        public string Diagnose { get; set; }
        public ICollection<Treatment> Treatments { get; set; }
        public DateTime Date { get; set; }
    }
}
