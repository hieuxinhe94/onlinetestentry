

using System;

namespace ITSOL.TestonlineServices.Model
{
    public class CandidateQuizResultViewModel
    {
        public int Id { get; set; }
        public QuizViewModel Quiz { get; set; }
        public CandidateViewModel Candidate { get; set; }
        public int CandidateQuizAssignId { get; set; }
        public DateTime DateSubmited { get; set; }
        public float WorkingTimeMinues { get; set; }
    }
}
