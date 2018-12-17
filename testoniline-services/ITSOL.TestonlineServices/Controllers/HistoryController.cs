
using AutoMapper;
using ITSOL.Business.Interfaces;
using ITSOL.TestonlineServices.Configuraions;
using Microsoft.AspNetCore.Mvc;

namespace ITSOL.TestonlineServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoryController : ControllerBase
    {
        private ILoggerManager logger;
        private readonly IMapper mapper;
        private IHistoryBusiness historyBusiness;

        public HistoryController(ILoggerManager _logger, IMapper _mapper, IHistoryBusiness _historyBusiness)
        {
            this.logger = _logger;
            this.mapper = _mapper;
            this.historyBusiness = _historyBusiness;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok();
        }
    }
}