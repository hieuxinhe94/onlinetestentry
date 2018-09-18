using TSOL.DAL.Base;
using TSOL.Domain.Entities;

namespace TSOL.DAL.Repository.RepositoryDomain
{
    public interface IApplicationConfigRepository : IRepositoryBase<ApplicationConfig>
    {
        // new specific methods need to implement
    }
    public class ApplicationConfigRepository : RepositoryBase<ApplicationConfig>, IApplicationConfigRepository
    {
        public ApplicationConfigRepository(ApplicationContext context) : base(context)
        {

        }
    }

}
