using ITSOL.Business.Interfaces;
using System.Collections.Generic;
using System.Linq;
using TSOL.DAL.Repository.RepositoryDomain;
using TSOL.Domain.Entities;

namespace ITSOL.Business.Implemented
{
    public class SummaryBusiness : ISummaryBusiness
    {
        private ICandidateQuizAssignResultRepository candidateQuizAssignResultRepository;
        private ICandidateQuizAssignRepository candidateQuizAssignRepository;
        public SummaryBusiness(ICandidateQuizAssignResultRepository _candidateQuizAssignResultRepository,
            ICandidateQuizAssignRepository _candidateQuizAssignRepository)
        {
            this.candidateQuizAssignResultRepository = _candidateQuizAssignResultRepository;
            this.candidateQuizAssignRepository = _candidateQuizAssignRepository;
        }
        public ICollection<CandidateQuizAssign> GetAllQuizAssigned()
        {
           return candidateQuizAssignRepository.GetAll().ToList();
        }

        public ICollection<CandidateQuizAssignAndResult> GetAllQuizAssignedResult()
        {
            return candidateQuizAssignResultRepository.GetFull().Result;
        }

        public ICollection<CandidateQuizAssignAndResult> GetQuizResultByCandidateName(string candidateName)
        {
            return candidateQuizAssignResultRepository.GetFullByCandidateName(candidateName).Result;
        }
    }
}
