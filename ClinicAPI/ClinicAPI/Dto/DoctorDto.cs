using ClinicAPI.Models;

namespace ClinicAPI.Dto
{
    public class DoctorDto
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string SpecialtyName { get; set; }
        public string ImgUrl { get; set; }
    }
}
