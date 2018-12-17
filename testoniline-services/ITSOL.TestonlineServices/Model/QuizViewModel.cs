

using System.Collections.Generic;

namespace ITSOL.TestonlineServices.Model
{
    public class QuizViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public float TimeUpMinutes { get; set; }
        public List<QuestionViewModel> Questions { get; set; }
    }
}
