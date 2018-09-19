using TSOL.DAL;
using TSOL.DAL.Base;
using TSOL.DAL.Repository;
using TSOL.Domain.Entities;

namespace ITSOL.DAL.Repository.RepositoryDomain
{
    
    public interface IAnswerRepository : IRepositoryBase<Answer>
    {
        // new specific methods need to implement
    }
    public class AnswerRepository : RepositoryBase<Answer>, IAnswerRepository
    {
        public AnswerRepository(ApplicationContext context) : base(context)
        {

        }
    }
}
