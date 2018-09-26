using AutoMapper;
using ITSOL.Business.Interfaces;
using ITSOL.TestonlineServices.Configuraions;
using ITSOL.TestonlineServices.Model;
using Microsoft.AspNetCore.Mvc;
using TSOL.Domain.Entities;

namespace ITSOL.TestonlineServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private ILoggerManager logger;
        private readonly IMapper mapper;
        private IQuizBusiness quizBusiness;

        public QuizController(ILoggerManager _logger, IMapper _mapper, IQuizBusiness _quizBusiness)
        {
            this.logger = _logger;
            this.mapper = _mapper;
            this.quizBusiness = _quizBusiness;
        }

        [HttpGet]
        public IActionResult GetAll()
        {

            return Ok(this.quizBusiness.GetAll());
        }

        [HttpGet]
        [Route("getBySubjectName")]
        public IActionResult GetBySubjectName(string name)
        {
            return Ok(this.quizBusiness.GetQuizByName(name));
        }

        [HttpGet]
        [Route("getFullQuizBySubjectName")]
        public IActionResult GetFullQuizBySubjectName(string name)
        {
            return Ok(this.quizBusiness.GetFullQuizBySubjectName(name));
        }

        [HttpPost]
        [Route("createNewSubject")]
        public IActionResult CreateNewSubject([FromBody] SubjectViewModel viewModel )
        {
            return Ok(this.quizBusiness.Create(mapper.Map<Quiz>(viewModel)));
        }

        [HttpPost]
        [Route("createNewQuiz")]
        public IActionResult CreateNewQuiz([FromBody] QuizViewModel viewModel)
        {
            return Ok(this.quizBusiness.Create(mapper.Map<Quiz>(viewModel)));
        }

        [HttpPost]
        [Route("insertOrUpdateQuestionToQuiz")]
        public IActionResult InsertNewQuestionToQuiz( [FromBody] QuestionViewModel viewModel)
        {
            if (ModelState.IsValid) 
            {
                return Ok(this.quizBusiness.InsertOrUpdateQuestionOfQuiz(mapper.Map<Question>(viewModel)));
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("insertOrUpdateAnswerToQuestion")]
        public IActionResult InsertOrUpdateAnswerToQuestion([FromBody] AnswerViewModel viewModel)
        {
            return Ok(this.quizBusiness.InsertOrUpdateAnwerOfQuestion(mapper.Map<Answer>(viewModel)));
        }
         
        [HttpPost]
        [Route("deleteQuestion")]
        public IActionResult DeleteQuestion([FromBody] int id)
        {

            return Ok(this.quizBusiness.DeleteQuestionOfQuiz(id));
        }

        [HttpPost]
        [Route("deleteAnswer")]
        public IActionResult DeleteAnswer(int id)
        {
            return Ok(this.quizBusiness.DeleteAnswerOfQuestion(id));
        }

        /// Candidate quiz api handler:
        
        [HttpPost]
        [Route("submitQuizByCandidate")]
        public IActionResult SubmitQuizByCandidate([FromBody] CandidateQuizResultViewModel viewModel)
        {
            return Ok(this.quizBusiness.SubmitQuizByTheCandidate( 
                mapper.Map<Quiz>(viewModel.Quiz),
                mapper.Map<Candidate>(viewModel.Candidate) ,
                viewModel.CandidateQuizAssignId, viewModel.WorkingTimeMinues));
        }

    }
}