
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
    }
}