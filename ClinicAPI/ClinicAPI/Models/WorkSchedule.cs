namespace ClinicAPI.Models
{
    public class WorkSchedule
    {
        public int Id { get; set; }
        public string DoctorId { get; set; }
        public Doctor Doctor { get; set; }
        public DateTime Date { get; set; }
        public ICollection<AppointmentDate> WorkingHours { get; set; }
    }
}
