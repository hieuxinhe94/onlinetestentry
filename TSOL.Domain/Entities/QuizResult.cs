 

namespace TSOL.Domain.Entities
{
    public class QuizResult : BaseEntity
    {
        public int QuizId { get; set; }
        public virtual Quiz Quiz { get; set; }

        public float Mark { get; set; }
        public float WorkingTimeMinues { get; set; }
        public bool Status { get; set; }
    }
}
