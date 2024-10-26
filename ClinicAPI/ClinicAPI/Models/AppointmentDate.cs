namespace ClinicAPI.Models
{
    public class AppointmentDate
    {
        public int Id { get; set; }
        public int WorkScheduleId { get; set; }
        public WorkSchedule WorkSchedule { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int? AppointmentId { get; set; }
        public Appointment? Appointment { get; set; }
    }
}
