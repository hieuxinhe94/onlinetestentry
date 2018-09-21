

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TSOL.Domain.Entities
{
    public class Question : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }

        public int QuizId { get; set; }
       //  public virtual Quiz Quiz { get; set; }

        public virtual ICollection<Answer> Answers { get; set; }

        public bool IsMultiSelection { get; set; } = false;

        [NotMapped]
        public bool HasAnswered { get; set; } = false;
    }
}
