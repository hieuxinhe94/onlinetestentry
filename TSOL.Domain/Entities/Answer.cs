

using System.ComponentModel.DataAnnotations.Schema;

namespace TSOL.Domain.Entities
{
    public class Answer : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }

        public int QuestionId { get; set; }
        // public virtual Question Question { get; set; } 
        public bool IsRightAnswer { get; set; } = false;

        [NotMapped]
        public bool HasSelected { get; set; } = false;
    }
}
