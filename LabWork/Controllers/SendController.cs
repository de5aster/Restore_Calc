using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestoreCalculator.Models;
using RestoreCalculator.Services;

namespace RestoreCalculator.Controllers
{   [Route("Home/Contact/api/[controller]")]
    public class SendController : Controller
    {
        [HttpPost]
        public IActionResult Post([FromBody] Mail sendMail)
        {
            var send = new EmailService();
            try
            {
                if (ModelState.IsValid)
                {
                    //send.SendEmail(sendMail.address, sendMail.message, sendMail.File);
                    send.SendEmail(sendMail.address, sendMail.message);
                    return Ok(sendMail);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return BadRequest("Don't send email");
        }        
               
    }
}
