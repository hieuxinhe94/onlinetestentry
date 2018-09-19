using Microsoft.EntityFrameworkCore;
using System.Linq;
using TSOL.DAL;
using TSOL.DAL.Base;
using TSOL.DAL.Repository;
using TSOL.Domain.Entities;

namespace ITSOL.DAL.Repository.RepositoryDomain
{
    
    public interface IQuizRepository : IRepositoryBase<Quiz>
    {
        // new specific methods need to implement
        Quiz GetFullQuestionQuiz(string name);
    }
    public class QuizRepository : RepositoryBase<Quiz>, IQuizRepository
    {
        public QuizRepository(ApplicationContext context) : base(context)
        {

        }

        public Quiz GetFullQuestionQuiz(string name)
        {
            return this._context.Set<Quiz>()
                 .Include(t => t.Questions)
                 .ThenInclude(x => x.Answers)
                 .Where(t => t.Name == name)
                 .FirstOrDefault();
        }
    }
}
