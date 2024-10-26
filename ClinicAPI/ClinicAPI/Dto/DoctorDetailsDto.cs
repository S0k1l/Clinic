namespace ClinicAPI.Dto
{
    public class DoctorDetailsDto
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string SpecialtyName { get; set; }
        public string ImgUrl { get; set; }
        public string Room { get; set; }
        public DateTime BirthDay { get; set; }
        public string Education { get; set; }
        public DateTime EmployedSince { get; set; }
    }
}
