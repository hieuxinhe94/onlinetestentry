using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using TSOL.DAL.Base;
using TSOL.Domain.Entities;

namespace TSOL.DAL.Repository.RepositoryDomain
{
    public interface ICandidateQuizAssignRepository : IRepositoryBase<CandidateQuizAssign>
    {
        // new specific methods need to implement
        IEnumerable<CandidateQuizAssign> IncludeAll();
    }
    public class CandidateQuizAssignRepository : RepositoryBase<CandidateQuizAssign>, ICandidateQuizAssignRepository
    {
        public CandidateQuizAssignRepository(ApplicationContext context) : base(context)
        {
        }

        public IEnumerable<CandidateQuizAssign> IncludeAll()
        {
            return _context.Set<CandidateQuizAssign>().Include(t => t.Candidate).Include(t => t.Quiz);
        }
    }

}
