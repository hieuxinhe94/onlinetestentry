

using System;

namespace TSOL.Domain.Entities
{
    public class CandidateQuizAssignAndResult : BaseEntity
    {
        public int CandidateQuizAssignId { get; set; }
        public virtual CandidateQuizAssign CandidateQuizAssign { get; set; }


        public DateTime DateSubmited { get; set; }

        public int AnsweredQuestionCount { get; set; }
        public int RightQuestionCount { get; set; }
        public int TotalQuestionCount { get; set; }

        public float Mark { get; set; }
        public float WorkingTimeMinues { get; set; }
        public bool Status { get; set; } = true;
    }
}
