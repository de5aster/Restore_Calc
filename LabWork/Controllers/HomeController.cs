using Microsoft.AspNetCore.Mvc;

namespace RestoreCalculator.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return Redirect("/Home/Calc");
        }
        public IActionResult Calc()
        {
            return View();
        }       
    }
}
