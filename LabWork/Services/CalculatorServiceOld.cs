using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using RestoreCalculator.Models;

namespace RestoreCalculator.Services
{
    public class CalculatorServiceOld
    {
        public List<Payment> PaymentList;
        private readonly Info info = new Info();

        public double GetRestorePrice(RestoreParam restoreParams) {

            var regionCoeficient = GetRegionCoefficient(restoreParams.Region);
            var tariffId = GetRestoreTariffName(restoreParams.Document);
            var tariff = GetTariff(restoreParams.TaxactionSystem, tariffId);
            return Math.Round(tariff * regionCoeficient); 
        }

        public double GetCurrentPrice(RestoreParam param)
        {
            var regionCoeficient = GetRegionCoefficient(param.Region);
            var tariffId = GetCurrentTariffName(param.Document);
            var tariff = GetTariff(param.TaxactionSystem, tariffId);
            return Math.Round(tariff * regionCoeficient);
        }

        private int GetTariff(string taxactionSystem, string tariffId)
        {
            var lines = ReadEmbeddedFile("TariffPrices.txt");
            var price = 0;
            var taxSystem = GetTaxactionSystem(taxactionSystem);

            foreach (var line in lines)
            {
                var splitted = line.Split(";");
                if (splitted[0] == tariffId) {
                    price = Convert.ToInt32(splitted[taxSystem]);
                }
            }
            return price;
        }

        private static string GetRestoreTariffName(double doc)
        {
            var ops = Convert.ToInt32(Math.Round(doc, 0));

            if (ops > 500)
                return "restore_501_600";
            if (ops > 400)
                return "restore_401_500";
            if (ops > 300)
                return "restore_301_400";
            if (ops > 200)
                return "restore_201_300";
            if (ops > 175)
                return "restore_176_200";
            if (ops > 150)
                return "restore_151_175";
            if (ops > 125)
                return "restore_126_150";
            if (ops > 100)
                return "restore_101_125";
            if (ops > 75)
                return "restore_76_100";
            if (ops > 50)
                return "restore_51_75";
            if (ops > 30)
                return "restore_31_50";
            if (ops > 10)
                return "restore_11_30";
            return "restore_0_10";
        }

        private static string GetCurrentTariffName(double doc)
        {
            var ops = Convert.ToInt32(Math.Round(doc, 0));

            if (ops > 400)
                return "401_500";
            if (ops > 300)
                return "301_400";
            if (ops > 200)
                return "201_300";
            if (ops > 175)
                return "176_200";
            if (ops > 150)
                return "151_175";
            if (ops > 125)
                return "126_150";
            if (ops > 100)
                return "101_125";
            if (ops > 75)
                return "76_100";
            if (ops > 50)
                return "51_75";
            if (ops > 30)
                return "31_50";
            if (ops > 10)
                return "11_30";
            if (ops > 3)
                return "4_10";
            return "restore_0_3";
        }

        private static int GetTaxactionSystem(string taxactionSystem)
        {
            switch (taxactionSystem)
            {
                case "envd":
                    return 1;
                case "usnd":
                    return 2;
                case "usndr":
                    return 3;
                case "osno":
                    return 4;   
                default:
                    return 0;
            }
        }

        private static double GetRegionCoefficient(string region)
        {
            var lines = ReadEmbeddedFile("RegionCoefficients.txt");
            double coef = 1;
            foreach (var line in lines)
            {                
                var splited = line.Split(';');
                if (splited.Length != 2)
                {
                    continue;
                }
                var reg = splited[0];
                if (reg == region) {
                    if (!double.TryParse(splited[1], NumberStyles.Any, CultureInfo.InvariantCulture, out coef)) {
                        continue;
                    }
                }                
            }
            return coef;
        }

        //linux  - / 
        //windows - \
        private static string[] ReadEmbeddedFile(string name)
        {
            var resourceName = Directory.GetCurrentDirectory() + $"/lib/{name}";
            using (var reader = new StreamReader(resourceName))
            {
                return reader.ReadToEnd().Replace("\r", "").Split('\n');
            }
        }

    }
}

