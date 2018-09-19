

using System;
using System.Collections.Generic;

namespace TSOL.Domain.Entities
{
    public class Quiz : BaseEntity
    {
        public string Name { get; set; } 
        public string Title { get; set; }
        public string Description { get; set; }
        public float TimeUpMinutes { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool Status { get; set; } = true;
    }
}
