

using System.Collections.Generic;

namespace ITSOL.TestonlineServices.Model
{
    public class QuestionViewModel
    {
        public int Id { get; set; }
        public int QuizId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        public List<AnswerViewModel> Answers { get; set; }
        public bool IsMultiSelection { get; set; } = false;
    }
}
