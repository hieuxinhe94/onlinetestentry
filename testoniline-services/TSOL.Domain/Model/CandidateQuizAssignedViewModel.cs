using System;
using System.Collections.Generic;
using TSOL.Domain.Entities;

namespace TSOL.Domain.Entities
{
    public class CandidateQuizAssignedViewModel
    {
        public int Id { get; set; }
        public int CandidateId { get; set; }
        public Candidate Candidate { get; set; }
        public ICollection<Quiz> Quizes { get; set; }
        public DateTime ? DateStart { get; set; }

        public DateTime ? DateExprire { get; set; }
    }
}
