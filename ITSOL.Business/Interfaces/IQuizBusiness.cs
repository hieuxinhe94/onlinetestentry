

using System.Collections.Generic;
using TSOL.Domain.Entities;

namespace ITSOL.Business.Interfaces
{
   public interface IQuizBusiness
    {
        
        Quiz GetQuizById(int id);
        Quiz GetQuizByName(string name);
        Quiz GetFullQuizBySubjectName(string name);
        int CreateNewSubject(Quiz quiz);
        IEnumerable<Quiz> GetAll();
        int Create(Quiz quiz);
        int InsertOrUpdate(Quiz q);
        int InsertOrUpdateQuestionOfQuiz(Question question);
        int InsertOrUpdateAnwerOfQuestion(Answer answer);
        int DeleteQuestionOfQuiz(int id);
        int DeleteAnswerOfQuestion(int id);

        int SubmitQuizByTheCandidate(Quiz quiz, Candidate candidate, int quizAssignedId);
    }
}
