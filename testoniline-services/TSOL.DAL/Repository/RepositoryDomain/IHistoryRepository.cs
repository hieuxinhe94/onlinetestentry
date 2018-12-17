using TSOL.DAL.Base;
using TSOL.Domain.Entities;

namespace TSOL.DAL.Repository.RepositoryDomain
{
    public interface IHistoryRepository : IRepositoryBase<History>
    {
        // new specific methods need to implement
    }
    public class HistoryRepository : RepositoryBase<History>, IHistoryRepository
    {
        public HistoryRepository(ApplicationContext context) : base(context)
        {

        }
    }

}
