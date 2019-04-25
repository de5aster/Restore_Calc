using Microsoft.AspNetCore.Mvc;
using RestoreCalculator.Models;
using RestoreCalculator.Services;

namespace RestoreCalculator.Controllers
{   [Route("Home/ObList/api/[controller]/[action]")]
    public class ObController : Controller
    {
        public ObService obService = new ObService();
        

        [HttpPost]
        public IActionResult Post([FromBody] Inn inn)
        {
            if (obService.SearchInObList(inn.inn)) {
                return Ok(inn);
            }
            return BadRequest(inn);
        }
        [HttpPost]
        public IActionResult Add([FromBody] Inn inn)
        {
            if (obService.SearchInObList(inn.inn))
            {
                return BadRequest(inn);
            }
            else
            {
                obService.AddInnToObList(inn.inn);
                return Ok(inn);
            }
        }
    }
}