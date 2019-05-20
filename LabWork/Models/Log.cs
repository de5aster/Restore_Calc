using System;

namespace RestoreCalculator.Models
{
    public class Log
    {
        public DateTime Date { get; set; }

        public string Action { get; set; }

        public Log(DateTime date, string action)
        {
            this.Date = date;
            this.Action = action;
        }

        public override string ToString()
        {
            return $"{Date.ToString()} - {Action}";
        }
    }
}
