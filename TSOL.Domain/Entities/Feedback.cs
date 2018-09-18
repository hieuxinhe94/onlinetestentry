 

namespace TSOL.Domain.Entities
{
    public class Feedback : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Phone { get; set; }
        public int ? GuessId { get; set; }
    }
}
