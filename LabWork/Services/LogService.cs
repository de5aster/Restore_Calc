using RestoreCalculator.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestoreCalculator.Services
{
    public class LogService
    {
        private readonly string logPath;
        private readonly string exceptionPath;

        public LogService()
        {
            logPath = Directory.GetCurrentDirectory() + $"/log/log.txt";
            exceptionPath = Directory.GetCurrentDirectory() + $"/log/exception.txt";
        }

        public void WriteAction(string action)
        {
            var log = new Log(DateTime.UtcNow, action);
            WriteToFile(log, logPath);
        }

        public void WriteException(string exception)
        {
            var log = new Log(DateTime.UtcNow, exception);
            WriteToFile(log, exceptionPath);
        }

        public byte[] GetFile(string option)
        {
            var path = GetPath(option);
            if (path == "")
            {
                return null;
            }

            return ReadFromFile(path);
        }

        private string GetPath(string option)
        {
            switch (option)
            {
                case "log":
                    return this.logPath;
                case "exception":
                    return this.exceptionPath;
                default:
                    break;
            }

            return "";
        }

        private static void WriteToFile(Log log, string path)
        {
            if (!File.Exists(path))
            {
                using (var sw = File.CreateText(path))
                {
                    sw.WriteLine(log.ToString());
                }
            }
            else
            {
                using (var sw = File.AppendText(path))
                {
                    sw.WriteLine(log.ToString());
                }
            }
        }

        private static byte[] ReadFromFile(string path)
        {
            byte[] bytes;
            if (!File.Exists(path))
                return null;
            using (var sr = new StreamReader(path))
            {
                bytes = Encoding.Default.GetBytes(sr.ReadToEnd());
            }

            return bytes;
        }

    }
}
