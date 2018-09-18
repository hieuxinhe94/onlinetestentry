 
using TSOL.DAL.Repository.RepositoryDomain;

namespace TSOL.DAL.Base
{
    public interface IRepositoryWrapper
    {
        IUserRepository UserRepository { get; }
 
        // new repository interface here 
    }

}
