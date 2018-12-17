using System;
using System.Collections.Generic;
using System.Text;
using TSOL.Domain.Entities;

namespace ITSOL.Business.Interfaces
{
   public interface IUserBusiness
    {
        bool Authenticate(string name, string password);
        User GetUser(int id);
        User GetUser(string name);
        IEnumerable<User> GetUsers();
        int Create(User user);
    }
}
