using TSOL.DAL.Base;
using TSOL.Domain.Entities;

namespace TSOL.DAL.Repository.RepositoryDomain
{
    public interface ICandidateQuizAssignResultRepository : IRepositoryBase<CandidateQuizAssignAndResult>
    {
        // new specific methods need to implement
    }
    public class CandidateQuizAssignResultRepository : RepositoryBase<CandidateQuizAssignAndResult>, ICandidateQuizAssignResultRepository
    {
        public CandidateQuizAssignResultRepository(ApplicationContext context) : base(context)
        {
        }

    }

}
