using System.Collections.Generic;
using TSOL.Domain.Entities;

namespace ITSOL.Business.Interfaces
{
   public interface ICandidateBusiness
    {
        bool Authenticate(string name, string password);
        int RegisterNewCandidate(Candidate candidate);
        int RemoveCandidate(Candidate candidate);
        Candidate GetCandidateInfo(int id);
        ICollection<Candidate> GetAll();
        ICollection<Candidate> GetAll(int page_size, int page_num, int page_index, string key_word);

    }
}
