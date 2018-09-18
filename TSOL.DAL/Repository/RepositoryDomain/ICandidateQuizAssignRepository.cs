using TSOL.DAL.Base;
using TSOL.Domain.Entities;

namespace TSOL.DAL.Repository.RepositoryDomain
{
    public interface ICandidateQuizAssignRepository : IRepositoryBase<CandidateQuizAssign>
    {
        // new specific methods need to implement
    }
    public class CandidateQuizAssignRepository : RepositoryBase<CandidateQuizAssign>, ICandidateQuizAssignRepository
    {
        public CandidateQuizAssignRepository(ApplicationContext context) : base(context)
        {
        }

    }

}
