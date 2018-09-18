using AutoMapper;
using ITSOL.Business.Interfaces;
using ITSOL.TestonlineServices.Configuraions;
using Microsoft.AspNetCore.Mvc;

namespace ITSOL.TestonlineServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private ILoggerManager logger;
        private readonly IMapper mapper;
        private IFeedbackBusiness feedbackBusiness;
        public FeedbackController(ILoggerManager _logger, IMapper _mapper, IFeedbackBusiness _feedbackBusiness)
        {
            this.logger = _logger;
            this.mapper = _mapper;
            this.feedbackBusiness = _feedbackBusiness;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok();
        }
    }
}