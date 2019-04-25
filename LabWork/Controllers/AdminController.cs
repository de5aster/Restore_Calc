using Microsoft.AspNetCore.Mvc;
using RestoreCalculator.Models;
using RestoreCalculator.Services;

namespace RestoreCalculator.Controllers
{
    [Route("Home/Admin/api/[controller]")]
    public class AdminController : Controller
    {
        LoginService ls = new LoginService();
        public IActionResult Post([FromBody] User user)
        {
            if (ls.IsLogin(user)) { return Ok(user); }
            return BadRequest(user);
        }
    }
}