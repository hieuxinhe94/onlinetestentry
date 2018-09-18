using TSOL.DAL.Base;
using TSOL.Domain.Entities;

namespace TSOL.DAL.Repository.RepositoryDomain
{
    public interface IFeedbackRepository : IRepositoryBase<Feedback>
    {
        // new specific methods need to implement
    }
    public class FeedbackRepository : RepositoryBase<Feedback>, IFeedbackRepository
    {
        public FeedbackRepository(ApplicationContext context) : base(context)
        {

        }
    }

}
