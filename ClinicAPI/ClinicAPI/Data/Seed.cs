using ClinicAPI.Dto;
using ClinicAPI.Models;
using Microsoft.AspNetCore.Identity;
using System.Diagnostics;
using System.Net;
using System.Numerics;

namespace ClinicAPI.Data
{
    public class Seed
    {
        public static async Task SeedData(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<AppDbContext>();

                context.Database.EnsureCreated();

                //Roles
                var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                if (!await roleManager.RoleExistsAsync(UserRoles.Doctor))
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.Doctor));
                if (!await roleManager.RoleExistsAsync(UserRoles.Patient))
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.Patient));

                //Users
                var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
                if(!userManager.Users.Any()) 
                {
                    var patient = new Patient
                    {
                        Email = "qwe@mail.com",
                        UserName = "qwe@mail.com",
                        PhoneNumber = "123456789",
                        LastName = "Іванов",
                        FirstName = "Іван",
                        MiddleName = "Іванович",
                        BirthDay = DateTime.Parse("15.06.2003"),
                        isMale = true,
                        BloodType = Enum.BloodType.APos,
                    };

                    await userManager.CreateAsync(patient, "qweqwe!1Q");
                    await userManager.AddToRoleAsync(patient, UserRoles.Patient);


                    List<Doctor> doctors = new List<Doctor>();

                    string[] educationOptions = new[]
                    {
                         "Національний медичний університет ім. О.О. Богомольця",
                         "Одеський національний медичний університет",
                         "Львівський національний медичний університет ім. Данила Галицького",
                         "Дніпровський державний медичний університет",
                         "Запорізький державний медичний університет"
                    };

                    string[] firstNames = { "Олександр", "Марія", "Віктор", "Наталія", "Дмитро", "Ольга", "Андрій", "Світлана", "Сергій", "Ірина",
                        "Юрій", "Тетяна", "Володимир", "Ганна", "Богдан", "Катерина", "Ігор", "Оксана", "Михайло", "Вікторія" };

                    string[] lastNames = { "Іваненко", "Петренко", "Сидоренко", "Коваленко", "Ткаченко", "Шевченко", "Левченко", "Гнатенко", "Мороз", "Лисенко",
                        "Козаченко", "Головко", "Захарченко", "Руденко", "Мельник", "Кравченко", "Омельченко", "Клименко", "Зайченко", "Василенко" };

                    string[] middleNames = { "Олександрович", "Маріївна", "Вікторович", "Наталіївна", "Дмитрович", "Ольгівна", "Андрійович", "Світланівна", "Сергійович", "Ірінівна",
                        "Юрійович", "Тетянівна", "Володимирович", "Ганнівна", "Богданович", "Катеринівна", "Ігорович", "Оксанівна", "Михайлович", "Вікторівна" };

                    List<Specialty> specialties = new List<Specialty>
                    {
                        new Specialty { Name = "Кардіолог" },
                        new Specialty { Name = "Невропатолог" },
                        new Specialty { Name = "Сімейни лікар" },
                        new Specialty { Name = "Ортопед" },
                        new Specialty { Name = "Терапевт" },
                        new Specialty { Name = "Ендокринолог" },
                        new Specialty { Name = "Алерголог" },
                        new Specialty { Name = "Дерматолог" },
                        new Specialty { Name = "Педіатр" },
                        new Specialty { Name = "Отоларинголог" }
                    };

                    await context.AddRangeAsync(specialties);


                    for (int i = 0; i < 20; i++)
                    {
                        var (BDay, employeeSince) = GetBDayAndEmployeeDate();
                        var doctorSchedules = GenerateWorkSchedules(specialties[i % specialties.Count].Id);
                        doctors.Add(new Doctor
                        {
                            Email = $"doctor{i + 1}@mail.com",
                            UserName = $"doctor{i + 1}@mail.com",
                            LastName = lastNames[i],
                            MiddleName = middleNames[i],
                            FirstName = firstNames[i],
                            BirthDay = BDay,
                            isMale = i % 2 == 0,
                            ImgUrl = $"doctors/Face_{i + 1}.webp",
                            SpecialtyId = specialties[i % specialties.Count].Id,
                            Specialty = specialties[i % specialties.Count],
                            Room = $"{i + 1}",
                            Education = educationOptions[i % educationOptions.Length],
                            EmployedSince = employeeSince,
                            WorkSchedules = doctorSchedules
                        });
                    }

                    foreach (var doctor in doctors)
                    {
                        await userManager.CreateAsync(doctor, "qweqwe!1Q");
                        await userManager.AddToRoleAsync(doctor, UserRoles.Doctor);
                    }
                }
            }
        }

        private static int GetInterval(int specialtyIndex)
        {
            switch (specialtyIndex)
            {
                case 1:
                    return 20;

                case 2:
                    return 20;

                case 3:
                    return 25;

                case 4:
                    return 25;

                case 5:
                    return 30;

                case 6:
                    return 30;

                case 7:
                    return 35;

                case 8:
                    return 35;

                case 9:
                    return 40;

                case 10:
                    return 40;

                default:
                    return 20;
            }
        }

        private static List<WorkSchedule> GenerateWorkSchedules(int specialtyIndex)
        {
            var workSchedules = new List<WorkSchedule>();

            var Date = DateTime.Today;

            for (int i = 0; i < 30; i++)
            {
                var (startTime, workingTime) = GenerateWorkTime();

                var workingHours = new List<AppointmentDate>();
                int interval = GetInterval(specialtyIndex);

                DateTime workingTimeStart = Date.AddHours(startTime);
                DateTime workingTimeEnd = Date.AddHours(startTime + workingTime);

                int firstBreak, secondBreak;
                secondBreak = 0;

                bool isFirstBreak, isSecondBreak;
                isFirstBreak = isSecondBreak = true;

                if (workingTime > 6)
                {
                    firstBreak = startTime + workingTime / 3;
                    secondBreak = firstBreak + workingTime / 3;
                }
                else
                {
                    firstBreak = startTime + workingTime / 3;
                }


                while (workingTimeStart < workingTimeEnd)
                {
                    if (workingTimeStart.Hour == firstBreak && isFirstBreak)
                    {
                        workingTimeStart = workingTimeStart.AddMinutes(30);
                        isFirstBreak = false;

                        continue;
                    }
                    if (workingTimeStart.Hour == secondBreak && isSecondBreak)
                    {
                        workingTimeStart = workingTimeStart.AddMinutes(30);
                        isSecondBreak = false;

                        continue;
                    }

                    workingHours.Add(new AppointmentDate
                    {
                        Start = workingTimeStart,
                        End = workingTimeStart.AddMinutes(interval),
                    });
                    workingTimeStart = workingTimeStart.AddMinutes(interval);
                }
                workSchedules.Add(new WorkSchedule
                {
                    Date = Date,
                    WorkingHours = workingHours
                });

                Date = Date.AddDays(1);
            }

            return workSchedules;
        }
        private static (int, int) GenerateWorkTime()
        {
            var startTime = new Random().Next(8, 16);
            var workingTime = new Random().Next(4, 8);

            if (startTime + workingTime > 20)
            {
                (startTime, workingTime) = GenerateWorkTime();
            }

            return (startTime, workingTime);
        }

        private static DateTime RandomDate()
        {
            var random = new Random();
            int minYear = DateTime.Today.AddYears(-40).Year;
            int maxYear = DateTime.Today.AddYears(-1).Year;
            var year = random.Next(minYear, maxYear);
            var month = random.Next(1, 12);
            var noOfDaysInMonth = DateTime.DaysInMonth(year, month);
            var day = random.Next(1, noOfDaysInMonth);
            return new DateTime(year, month, day);
        }

        private static (DateTime, DateTime) GetBDayAndEmployeeDate()
        {
            var BDay = RandomDate();
            var employeeSince = RandomDate();

            if (BDay > employeeSince || employeeSince.Year - BDay.Year < 25)
            {
                (BDay, employeeSince) = GetBDayAndEmployeeDate();
            }

            return (BDay, employeeSince);
        }
    }
}
