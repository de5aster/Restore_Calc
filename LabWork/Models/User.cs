using System.ComponentModel.DataAnnotations;

namespace RestoreCalculator.Models
{
    public class User
    {   [Required]
        public string Username;
        [Required]
        public string Password;

    }
}
