using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TSOL.DAL.Base;
using TSOL.Domain.Entities;

namespace TSOL.DAL.Repository.RepositoryDomain
{
    public interface ICandidateQuizAssignResultRepository : IRepositoryBase<CandidateQuizAssignAndResult>
    {
        // new specific methods need to implement

        Task<ICollection<CandidateQuizAssignAndResult>> GetFull();
        Task<ICollection<CandidateQuizAssignAndResult>> GetFullByCandidateName(string candidateName);
    }
    public class CandidateQuizAssignResultRepository : RepositoryBase<CandidateQuizAssignAndResult>, ICandidateQuizAssignResultRepository
    {
        public CandidateQuizAssignResultRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<ICollection<CandidateQuizAssignAndResult>> GetFull()
        {
            return await _context.Set<CandidateQuizAssignAndResult>().Include(t => t.CandidateQuizAssign).ToListAsync();
        }
        public async Task<ICollection<CandidateQuizAssignAndResult>> GetFullByCandidateName(string candidateName)
        {
            return await _context.Set<CandidateQuizAssignAndResult>().Where(k=>k.CandidateQuizAssign.Candidate.UserName.Equals(candidateName)).Include(t => t.CandidateQuizAssign).ThenInclude(k=>k.Quiz).ToListAsync();
        }

    }

}
