using RestoreCalculator.Models;

namespace RestoreCalculator.Services
{
    public class LoginService
    {
        const string username = "buhta";
        const string password = "ilovebuhta";

        public bool IsLogin(User user)
        {
            if (user.Username == username)
            {
                if (user.Password == password)
                {
                    return true;
                }
            }
            return false;
        }       
    }
}
