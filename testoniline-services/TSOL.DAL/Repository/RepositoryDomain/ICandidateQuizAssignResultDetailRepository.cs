using TSOL.DAL.Base;
using TSOL.Domain.Entities;

namespace TSOL.DAL.Repository.RepositoryDomain
{
    public interface ICandidateQuizAssignResultDetailRepository : IRepositoryBase<CandidateQuizAssignAndResultDetail>
    {
        // new specific methods need to implement
    }
    public class CandidateQuizAssignResultDetailRepository : RepositoryBase<CandidateQuizAssignAndResultDetail>, ICandidateQuizAssignResultDetailRepository
    {
        public CandidateQuizAssignResultDetailRepository(ApplicationContext context) : base(context)
        {
        }

    }

}
