using System;
using System.Collections.Generic;

namespace RestoreCalculator.Models
{
    public class ApiFile
    {
        public string[] Base64Content { get; set; }

        public List<byte[]> ConvertToByteArrayList()
        {
            try
            {
                var bytes = new List<byte[]>();
                foreach (var content in this.Base64Content)
                {
                    bytes.Add(Convert.FromBase64String(content));
                }

                return bytes;
            }
            catch (FormatException)
            {
                throw new Exception("Ошибка в чтении файла. Проверьте, возможно он пустой.");
            }
        }
    }
}
