﻿using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace RestoreCalculator
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                 .UseKestrel()
                 .UseContentRoot(Directory.GetCurrentDirectory())
                 .UseIISIntegration()
                 .UseStartup<Startup>()
                 .UseUrls("http://localhost:5021/")
                 .Build();
            host.Run();
        }       
    }
}
