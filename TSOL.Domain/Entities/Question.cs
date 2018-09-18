 

namespace TSOL.Domain.Entities
{
    public class Question : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }

        public int QuizId { get; set; }
        public virtual Quiz Quiz { get; set; }

        public bool IsMultiSelection { get; set; } = false;
    }
}
