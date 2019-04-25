using BankStatementCalculatorCore.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace RestoreCalculator.Services
{
    public class CreateResponse
    {
        //public static object Create(Info info)
        //{
        //    var result = new JObject()
        //    {
        //        ["document"] = new JObject
        //        {
        //            ["buy"] = info.DocumentCount.BuyCount,
        //            ["sell"] = info.DocumentCount.SellCount,
        //            ["equaring"] = info.DocumentCount.EquaringCount,
        //            ["comission"] = info.DocumentCount.BankComissionCount,
        //            ["tax"] = info.DocumentCount.TaxCount,
        //            ["incomingOrder"] = info.DocumentCount.IncomingBankOrder,
        //            ["outgoingOrder"] = info.DocumentCount.OutgoingBankOrder
        //        },
        //        ["info"] = new JObject
        //        {
        //            ["startDate"] = info.DateInStatement.DateFrom.ToShortDateString(),
        //            ["endDate"] = info.DateInStatement.DateTo.ToShortDateString(),
        //            ["month"] = info.DateInStatement.MonthCount
        //        },
        //        ["client"] = new JObject
        //        {
        //            ["inn"] = info.Organization.Inn,
        //            ["kpp"] = info.Organization.Kpp,
        //            ["name"] = info.Organization.NameToCamelCase()
        //        },
        //        ["tops"] = new JObject()
        //        {
        //            ["providers"] = JsonConvert.SerializeObject(info.TopProviders, Formatting.None),
        //            ["customers"] = JsonConvert.SerializeObject(info.TopCustomers),
        //            ["customers2"] = JsonConvert.SerializeObject(info.TopCustomers.List.ToArray())
        //        }
        //    };
        //    return result;
        //}
    }
}
