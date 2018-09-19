 

namespace ITSOL.TestonlineServices.Model
{
    public class AnswerViewModel
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool IsRightAnswer { get; set; } = false;
    }
}
