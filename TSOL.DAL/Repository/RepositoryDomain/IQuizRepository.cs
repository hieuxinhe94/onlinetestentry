using TSOL.DAL;
using TSOL.DAL.Base;
using TSOL.DAL.Repository;
using TSOL.Domain.Entities;

namespace ITSOL.DAL.Repository.RepositoryDomain
{
    
    public interface IQuizRepository : IRepositoryBase<Quiz>
    {
        // new specific methods need to implement
    }
    public class QuizRepository : RepositoryBase<Quiz>, IQuizRepository
    {
        public QuizRepository(ApplicationContext context) : base(context)
        {

        }
    }
}
