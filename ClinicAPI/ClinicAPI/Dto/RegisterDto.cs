using ClinicAPI.Data.Enum;
using System.ComponentModel.DataAnnotations;

namespace ClinicAPI.Dto
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string MiddleName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public DateTime BirthDay { get; set; }
        [Required]
        public bool isMale { get; set; }
        [Required]
        public BloodType BloodType { get; set; }

    }
}
