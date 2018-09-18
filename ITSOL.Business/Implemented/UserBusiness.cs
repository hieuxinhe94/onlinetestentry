using System.Collections.Generic;
using System.Linq;
using ITSOL.Business.Interfaces; 
using TSOL.DAL.Repository;
using TSOL.DAL.Repository.RepositoryDomain;
using TSOL.Domain.Entities;

namespace ITSOL.Business.Implemented
{
    public class UserBusiness : IUserBusiness
    {
        private IRepositoryWrapper _repositoryWrapper;
        private IUserRepository _userRepository;

        public UserBusiness(IRepositoryWrapper repositoryWrapper, IUserRepository userRepository)
        {
            this._repositoryWrapper = repositoryWrapper;
            this._userRepository = userRepository;
        }

        public bool Authenticate(string name, string password)
         => this._userRepository.FindWithCondition(item => item.Name == name.ToLower() && item.Password == password.ToLower()).Any();

        public User GetUser(int id)
        {
            return _repositoryWrapper.UserRepository.GetById(id);
        }

        public IEnumerable<User> GetUsers()
        {
            var data = _repositoryWrapper.UserRepository.GetAll().Take(50);
            return data;
           
        }
    }
}
