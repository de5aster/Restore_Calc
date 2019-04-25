using System.IO;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;

namespace RestoreCalculator.Services
{
    public class EmailService
    {
        public bool SendEmail(string email, string message/*, IFormFile file*/)
        {
            try
            {
                var body = "От: " + email + "<br /> Сообщение:" + message;
                var mailMessage = new MailMessage(
                    "adgwt@mail.ru",//from
                    "adgwt@mail.ru",//to
                    "Отзыв из системы",//subject
                    body //body
                )
                {
                    IsBodyHtml = true
                };
                //добавление файла

                //var file = Directory.GetCurrentDirectory() + $"/lib/TariffPrices.txt";
                //Attachment data = new Attachment(file, MediaTypeNames.Application.Octet);
                //var disposition = data.ContentDisposition;
                //disposition.CreationDate = File.GetCreationTime(file);
                //disposition.ModificationDate = File.GetLastWriteTime(file);
                //disposition.ReadDate = File.GetLastAccessTime(file);

                //mailMessage.Attachments.Add(data);

                using (var client = new SmtpClient("smtp.mail.ru", 587))
                {
                    client.EnableSsl = true;
                    client.Credentials = new NetworkCredential("adgwt@mail.ru", "Qadgwt1409");
                    client.Send(mailMessage);
                }
                return true;
            }
            catch { return false; }
        }
    }
}
