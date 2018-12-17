
using AutoMapper;
using ITSOL.Business.Interfaces;
using ITSOL.TestonlineServices.Configuraions;
using Microsoft.AspNetCore.Mvc;

namespace ITSOL.TestonlineServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SummaryController : ControllerBase
    {
        private ILoggerManager logger;
        private readonly IMapper mapper;

        private ISummaryBusiness summaryBusiness;

        public SummaryController(ILoggerManager _logger, IMapper _mapper, ISummaryBusiness _summaryBusiness)
        {
            this.logger = _logger;
            this.mapper = _mapper;
            this.summaryBusiness = _summaryBusiness;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok();
        }

        [HttpGet]
        [Route("GetAllQuizAssigned")]
        public IActionResult GetAllQuizAssigned()
        {
            return Ok(summaryBusiness.GetAllQuizAssigned());
        }

        [HttpGet]
        [Route("GetAllQuizAssignedResult")]
        public IActionResult GetAllQuizAssignedResult()
        {
            return Ok(summaryBusiness.GetAllQuizAssignedResult());
        }

        [HttpGet]
        [Route("GetAllQuizAssignedResultByCandidateName")]
        public IActionResult GetAllQuizAssignedResultByCandidateName(string candidateName)
        {
            return Ok(summaryBusiness.GetQuizResultByCandidateName(candidateName));
        }
    }
}