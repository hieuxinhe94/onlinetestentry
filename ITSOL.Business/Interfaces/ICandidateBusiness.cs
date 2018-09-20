using System.Collections.Generic;
using TSOL.Domain.Entities;

namespace ITSOL.Business.Interfaces
{
   public interface ICandidateBusiness
    {
        bool Authenticate(string name, string password);
        int RegisterNewOrUpdateCandidate(Candidate candidate, string subject);
        int RemoveCandidate(int id);
        Candidate GetCandidateInfo(int id);
        ICollection<Candidate> GetAll();
        ICollection<Candidate> GetAll(int page_size, int page_num, int page_index, string key_word);
        CandidateQuizAssignedViewModel GetQuizAssigned(int candidateId);
    }
}
