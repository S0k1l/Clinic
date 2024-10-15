using System.ComponentModel.DataAnnotations.Schema;

namespace ClinicAPI.Models
{
    public class Treatment
    {
        public int Id { get; set; }
        public string Medicine { get; set; }
        public string Dosage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int MedicalRecordsId { get; set; }
        public MedicalRecord MedicalRecords { get; set; }
    }
}
