using System.Collections.Generic;
using System.Linq;
using ITSOL.Business.Interfaces;
using TSOL.DAL.Base;
using TSOL.DAL.Repository.RepositoryDomain;
using TSOL.Domain.Entities;

namespace ITSOL.Business.Implemented
{
    public class CandidateBusiness : ICandidateBusiness
    {
        
        private ICandidateRepository _candidateRepository;

        public CandidateBusiness( ICandidateRepository candidateRepository)
        {
             
            this._candidateRepository = candidateRepository;
        }

        public bool Authenticate(string name, string password)
            => 
            this._candidateRepository.FindWithCondition(item => item.UserName == name.ToLower() && item.Password == password.ToLower()).Any() ;
                        
        

        public ICollection<Candidate> GetAll()
        {
            return this._candidateRepository.GetAll().ToList();
        }

        public ICollection<Candidate> GetAll(int page_size, int page_num, int page_index, string key_word)
        {
            return this._candidateRepository.GetAll()
                .Take(page_size).Skip(page_index * page_size)
                .Where( t=>t.UserName.Contains(key_word))
                .ToList();
        }

        public Candidate GetCandidateInfo(int id)
        {
            return this._candidateRepository.GetById(id);
        }

        public int RegisterNewCandidate(Candidate candidate)
        {
            if (candidate != null && candidate.Id == 0)
            {
                return this._candidateRepository.Add(candidate);
            }
            return 0;
        }

        public int RemoveCandidate(Candidate candidate)
        {
            if (candidate != null && candidate.Id > 0)
            {
                return this._candidateRepository.Delete(candidate.Id);
            }
            return 0;
        }
    }
}
