using TSOL.DAL.Base;
using TSOL.Domain.Entities;

namespace TSOL.DAL.Repository.RepositoryDomain
{
    public interface ICandidateRepository : IRepositoryBase<Candidate>
    {
        // new specific methods need to implement
    }
    public class CandidateRepository : RepositoryBase<Candidate>, ICandidateRepository
    {
        public CandidateRepository(ApplicationContext context) : base(context)
        {

        }
    }

}
