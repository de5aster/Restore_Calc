using System.Collections.Generic;
using System.Linq;
using RestoreCalculator.Models;

namespace RestoreCalculator.Services
{
    public class ObService
    {
        public List<long> obList;
        public ObService() {
            obList = Ob.obList;
        }

        public void AddInnToObList(long inn)
        {            
                obList.Add(inn);            
        }

        public bool SearchInObList(long inn)
        {
            if (obList.FirstOrDefault(x => x == inn) == inn)
                return true;
            return false;
        }
    }
}
