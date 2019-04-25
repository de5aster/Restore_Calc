using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace RestoreCalculator.Models
{
    public class Mail
    {
        [Required(ErrorMessage = "Обязательное поле")]
        [EmailAddress(ErrorMessage = "Введите корректный e-mail адрес")]        
        public string address { get; set; }

        [Required(ErrorMessage = "Обязательное поле")]
        [StringLength(2000, ErrorMessage = "Максимум 2000 символов")]
        public string message { get; set; }

        public IFormFile File { get; set; }

    }
}
