using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RestoreCalculator.Models;
using RestoreCalculator.Services;
using BankStatementCalculatorCore.Services;
using BankStatementCalculatorCore.Helper;
using System.Text;

namespace RestoreCalculator.Controllers
{
    [Route ("home/calc/api/")]
    public class CalcController : Controller
    {
        private readonly CalculatorServiceOld calcService = new CalculatorServiceOld();
        private readonly List<string> fileLines = new List<string>();
        
        [HttpPost]
        [Route ("restore")]
        public IActionResult Restore([FromBody] ClientParameters parameters)
        {
            if (parameters == null)
            {
                return StatusCode(409);
            }
            var res = calcService.GetRestorePrice(parameters);
            return Ok(res);
        }

        [HttpPost]
        [Route("current")]
        public IActionResult CurrentPrice([FromBody] ClientParameters parameters)
        {
            if (parameters == null)
            {
                return StatusCode(409);
            }
            var res = calcService.GetCurrentPrice(parameters);
            return Ok(res);
        }

        [HttpPost]
        [Route("files")]
        public IActionResult GetAllFromStatementList([FromBody] ApiFile files)
        {
            if (files == null || files.Base64Content.Length == 0)
            {
                return BadRequest("Файл не может быть пустым. Выберите файл.");
            }

            var calculatorService = new CalculatorService();
            var byteArrayList = files.ConvertToByteArrayList();

            var bs = BankStatementReader.ReadFromByteArrayList(byteArrayList, Encoding.GetEncoding(1251));
            var info = calculatorService.GetInfoFromStatementList(bs);
            return Ok(info);
        }        
    }
} 