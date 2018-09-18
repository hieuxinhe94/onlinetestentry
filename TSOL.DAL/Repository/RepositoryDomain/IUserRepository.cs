using TSOL.DAL.Base;
using TSOL.Domain.Entities;

namespace TSOL.DAL.Repository.RepositoryDomain
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        // new specific methods need to implement
    }
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(ApplicationContext context) : base(context)
        { }
    }

}
