using TSOL.DAL.Repository.RepositoryDomain;

namespace TSOL.DAL.Repository
{
    public interface IRepositoryWrapper
    {
        IUserRepository UserRepository { get; }
        // new repository interface here 
    }

    public class RepositoryWrapper : IRepositoryWrapper
    {
        private ApplicationContext _context;
        private IUserRepository _userRepository;

        public RepositoryWrapper(ApplicationContext context,
            IUserRepository userRepository
            )
        {
            this._userRepository = userRepository;
            _context = context;
        }

        public IUserRepository UserRepository
        {
            get
            {
                if (_userRepository == null)
                    return new UserRepository(_context);
                return this._userRepository;
            }
        }
        // new get method here

    }


}
