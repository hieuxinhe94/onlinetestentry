using TSOL.DAL;
using TSOL.DAL.Base;
using TSOL.DAL.Repository;
using TSOL.Domain.Entities;

namespace ITSOL.DAL.Repository.RepositoryDomain
{
    
    public interface IQuestionRepository : IRepositoryBase<Question>
    {
        // new specific methods need to implement
    }
    public class QuestionRepository : RepositoryBase<Question>, IQuestionRepository
    {
        public QuestionRepository(ApplicationContext context) : base(context)
        {

        }
    }
}
