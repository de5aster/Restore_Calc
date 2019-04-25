using System.Net.Http;
using System.Net.Http.Headers;

namespace RestoreCalculator.Services
{
    public class ConnectService
    {
        private HttpClient client;

        public HttpClient CreateConnect(int id)
        {
            client =  new HttpClient();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.UserAgent.Clear();
            client.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("test-api", id.ToString()));
            return client;
        }
        public HttpClient CreateConnect()
        {
            client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.UserAgent.Clear();
            client.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("test-api", "1"));
            return client;
        }
    }
}
