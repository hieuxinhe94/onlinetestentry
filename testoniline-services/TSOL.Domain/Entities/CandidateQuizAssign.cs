

using System;

namespace TSOL.Domain.Entities
{
    public class CandidateQuizAssign : BaseEntity
    {
        public int CandidateId { get; set; }
        public virtual Candidate Candidate { get; set; }

        public int QuizId { get; set; }
        public virtual Quiz Quiz { get; set; }

        public DateTime ? DateStart { get; set; }

        public DateTime ? DateExprire { get; set; }

        public bool Status { get; set; } = true;
    }
}
