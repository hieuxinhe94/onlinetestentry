using System.Collections.Generic;
using System.Linq;
using ITSOL.Business.Interfaces;
using ITSOL.DAL.Repository.RepositoryDomain;
using TSOL.Domain.Entities;

namespace ITSOL.Business.Implemented
{
    public class QuizBusiness : IQuizBusiness
    {

        private IQuizRepository quizRepository;
        private IQuestionRepository questionRepository;
        private IAnswerRepository answerRepository;

        public QuizBusiness(IQuizRepository _quizRepository, IQuestionRepository _questionRepository , IAnswerRepository _answerRepository)
        {
            this.quizRepository = _quizRepository;
            this.questionRepository = _questionRepository;
            this.answerRepository = _answerRepository;
        } 

        public int Create(Quiz quiz) => quizRepository.Add(quiz);


        public int CreateNewSubject(Quiz quiz)
        {
            throw new System.NotImplementedException();
        }

        public int DeleteAnswerOfQuestion(int id) => answerRepository.Delete(id);


        public int DeleteQuestionOfQuiz(int id) => questionRepository.Delete(id);


        public IEnumerable<Quiz> GetAll() =>  quizRepository.GetAll();

        public Quiz GetFullQuizBySubjectName(string name)
        {
            return quizRepository.GetFullQuestionQuiz(name);
        }

        public Quiz GetQuizById(int id) => quizRepository.GetById(id);

        public Quiz GetQuizByName(string name) => quizRepository.FindWithCondition(item => item.Name == name.ToLower()).FirstOrDefault();

        public int InsertOrUpdate(Quiz q)
        {
            if (q != null && q.Id == 0)
            {
                quizRepository.Add(q);
            }
            return 0;
        }

        public int InsertOrUpdateAnwerOfQuestion(Answer answer)
        {
            if (answer != null && answer.Id == 0)
            {
                answerRepository.Add(answer);
            }
            if (answer != null && answer.Id != 0)
            {
                answerRepository.Update(answer);
            }
            else 
            return 0;
            return 1;
        }

        public int InsertOrUpdateQuestionOfQuiz(Question question)
        {
            if (question != null && question.Id == 0)
            {
                for (int i = 0; i < question.Answers.Count; i++)
                {
                    question.Answers.ElementAt(i).Id = 0;
                   // question.Answers.ElementAt(i).QuestionId = question.Id;
                }

                questionRepository.Add(question);
                
               // answerRepository.AddMany(question.Answers.ToList());
                return 1;
            }
            else if (question != null && question.Id != 0)
            {
                questionRepository.Update(question);
                return 1;
            }
            else 
                return 0;
            
        }
    }
}
