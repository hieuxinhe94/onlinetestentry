using AutoMapper;
using ITSOL.Business.Interfaces;
using ITSOL.TestonlineServices.Configuraions;
using Microsoft.AspNetCore.Mvc;

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
            return Ok();
        }
    }
}