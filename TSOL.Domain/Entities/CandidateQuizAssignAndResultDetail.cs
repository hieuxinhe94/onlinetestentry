
using System;

namespace TSOL.Domain.Entities
{
    public class CandidateQuizAssignAndResultDetail : BaseEntity
    {
        public int CandidateQuizAssignAndResultId { get; set; }
        public virtual CandidateQuizAssignAndResult CandidateQuizAssignAndResult { get; set; }

        public int AnswerSeletectedId { get; set; }
        public virtual Answer AnswerSeletected { get; set; }

        public DateTime DateSelected { get; set; }
    }
}
