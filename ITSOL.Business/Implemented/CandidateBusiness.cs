using System;
using System.Collections.Generic;
using System.Linq;
using ITSOL.Business.Interfaces;
using ITSOL.DAL.Repository.RepositoryDomain; 
using TSOL.DAL.Repository.RepositoryDomain;
using TSOL.Domain.Entities;

namespace ITSOL.Business.Implemented
{
    public class CandidateBusiness : ICandidateBusiness
    {
        private IQuizRepository _quizRepository;
        private IQuizBusiness _quizBusiness;
        private ICandidateRepository _candidateRepository;
        private ICandidateQuizAssignRepository _candidateQuizAssignRepository;
        private ICandidateQuizAssignResultRepository _candidateQuizAssignResultRepository;
        private ICandidateQuizAssignResultDetailRepository _candidateQuizAssignResultDetailRepository;

        public CandidateBusiness(
            IQuizBusiness quizBusiness,
            IQuizRepository quizRepository,
            ICandidateRepository candidateRepository, 
            ICandidateQuizAssignRepository candidateQuizAssignRepository, 
            ICandidateQuizAssignResultRepository candidateQuizAssignResultRepository, 
            ICandidateQuizAssignResultDetailRepository candidateQuizAssignResultDetailRepository)
        {
            this._quizBusiness = quizBusiness;
            this._quizRepository = quizRepository;
            this._candidateRepository = candidateRepository;
            this._candidateQuizAssignRepository = candidateQuizAssignRepository;
            this._candidateQuizAssignResultRepository = candidateQuizAssignResultRepository;
            this._candidateQuizAssignResultDetailRepository = candidateQuizAssignResultDetailRepository;
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

        public Candidate GetCandidateInfo(string name)
        {
            return this._candidateRepository.FindWithCondition( c=> c.UserName.Equals(name, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
        }

        public CandidateQuizAssignedViewModel GetQuizAssigned(int candidateId)
        {
           var tmp = _candidateQuizAssignRepository.IncludeAll().Where((q) => q.CandidateId == candidateId) ;
            if (tmp.Any())
            {
                return new CandidateQuizAssignedViewModel()
                {
                    Id = tmp.FirstOrDefault().Id,
                    Candidate = tmp.FirstOrDefault().Candidate,
                    Quizes = tmp.Select(t => t.Quiz)?.ToList(),
                    DateStart = tmp.FirstOrDefault().DateStart,
                    DateExprire = tmp.FirstOrDefault().DateExprire,
                    CandidateId = tmp.FirstOrDefault().CandidateId
                };
            }
            return null;
          
        }

        public int RegisterNewOrUpdateCandidate(Candidate candidate, string subject)
        {
            if (candidate != null && candidate.Id == 0)
            {
                this._candidateRepository.Add(candidate);

                // iq and gmat also is default
                this._candidateQuizAssignRepository.Add(new CandidateQuizAssign
                {
                    CandidateId = candidate.Id,
                    QuizId =
                    _quizBusiness.GetQuizByName("iq").Id,
                    Status = true,
                });

                // iq and gmat also is default
                this._candidateQuizAssignRepository.Add(new CandidateQuizAssign
                {
                    CandidateId = candidate.Id,
                    QuizId =
                    _quizBusiness.GetQuizByName("gmat").Id,
                    Status = true,
                });

                // also add quiz assign subject
                this._candidateQuizAssignRepository.Add(new CandidateQuizAssign { CandidateId = candidate.Id, QuizId =
                       _quizBusiness.GetQuizByName(subject.ToLower()).Id,
                       Status = true,
                });
                return 1;
            }
            else if (candidate != null && candidate.Id != 0)
            {
                this._candidateRepository.Update(candidate);
            }
                return 0;
        }

        public int RemoveCandidate(int id)
        {
            if (id > 0)
            {
                return this._candidateRepository.Delete(id);
            }
            return 0;
        }
    }
}
