using System;
using System.Collections.Generic;
using System.Linq;
using ITSOL.Business.Interfaces;
using ITSOL.DAL.Repository.RepositoryDomain;
using TSOL.DAL.Repository.RepositoryDomain;
using TSOL.Domain.Entities;

namespace ITSOL.Business.Implemented
{
    public class QuizBusiness : IQuizBusiness
    {

        private IQuizRepository quizRepository;
        private IQuestionRepository questionRepository;
        private IAnswerRepository answerRepository;
        private ICandidateQuizAssignResultRepository candidateQuizAssignResultRepository;
        private ICandidateQuizAssignRepository candidateQuizAssignRepository;

        public QuizBusiness(IQuizRepository _quizRepository, IQuestionRepository _questionRepository, IAnswerRepository _answerRepository, ICandidateQuizAssignResultRepository _candidateQuizAssignResultRepository, ICandidateQuizAssignRepository _candidateQuizAssignRepository)
        {
            this.quizRepository = _quizRepository;
            this.questionRepository = _questionRepository;
            this.answerRepository = _answerRepository;
            this.candidateQuizAssignResultRepository = _candidateQuizAssignResultRepository;
            this.candidateQuizAssignRepository = _candidateQuizAssignRepository;
        }

        public int Create(Quiz quiz)
        {
            if (this.GetQuizByName(quiz.Name) == null )
            {
                quizRepository.Add(quiz);
                return 1;
            }
            return 0;
        }


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

        public int SubmitQuizByTheCandidate(Quiz quiz, Candidate candidate, int quizAssignedId)
        {
            var newestQuizAssigned = candidateQuizAssignRepository
              .FindWithCondition(t => t.CandidateId == candidate.Id && t.QuizId == quiz.Id).OrderByDescending(t => t.Id).FirstOrDefault();

            if (quiz != null && candidate != null && newestQuizAssigned != null) 
            {

                 // calculate total answer question
                int totalAnswered = CalculateQuestionsAnswered(quiz);

                // calculate mark
                float rightAnswer = CalculateRightQuestion(quiz);

                // total question 
                int totalQuestion = CalculateTotalQuestions(quiz);

                float mark = rightAnswer * 100 / (float) totalQuestion;

                var newResult = new CandidateQuizAssignAndResult
                {
                    Id = 0,
                    Mark = mark,
                    DateSubmited = DateTime.Now,
                    CandidateQuizAssignId = newestQuizAssigned.Id,
                    // lam tron diem
                    RightQuestionCount = (int)rightAnswer,
                    AnsweredQuestionCount = totalAnswered,
                    TotalQuestionCount = totalQuestion,
                    WorkingTimeMinues = 20,

                };

                candidateQuizAssignResultRepository.Add(newResult);
                return 1;
            }
            return 0;
        }

        ///
        ///
        private int CalculateQuestionsAnswered(Quiz quiz)
        {
            return quiz.Questions.Where(t=>t.HasAnswered).Count();
        }

        private int CalculateTotalQuestions(Quiz quiz)
        {
            return quiz.Questions.Count();
        }

        private float CalculateRightQuestion(Quiz quiz)
        {
            float rightInNotMultiSelectQuestion = quiz.Questions.Where(k=>k.IsMultiSelection == false)
                .SelectMany(t => t.Answers).Where(t => t.HasSelected && t.IsRightAnswer).Count();
           
            var tmp = quiz.Questions.Where(k => k.IsMultiSelection == true).ToList();
            if (tmp!= null)
            {
                foreach (var item in tmp)
                {
                    int countAllRightAnswers = item.Answers.Where(t => t.IsRightAnswer).Count();
                    int countAllRightAnswersCandidateSelected = item.Answers.Where(t => t.IsRightAnswer && t.HasSelected).Count();
                    int countAllWrongAnswersCandidateSelected = item.Answers.Where(t => t.IsRightAnswer == false && t.HasSelected).Count();

                    if (countAllRightAnswers != 0)
                    {
                        float markOfThisQuestions = (countAllRightAnswersCandidateSelected - countAllWrongAnswersCandidateSelected) / (float)countAllRightAnswers;
                        rightInNotMultiSelectQuestion += markOfThisQuestions;
                    }
                  
                }
            }

            return rightInNotMultiSelectQuestion;
        }

    }
}
