
using AutoMapper;
using ITSOL.Business.Interfaces;
using ITSOL.TestonlineServices.Configuraions;
using Microsoft.AspNetCore.Mvc;

namespace ITSOL.TestonlineServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationConfigController : ControllerBase
    {
        private ILoggerManager logger;
        private readonly IMapper mapper;
        private IApplicationConfigBusiness applicationConfigBusiness;

        public ApplicationConfigController(ILoggerManager _logger, IMapper _mapper, IApplicationConfigBusiness _applicationConfigBusiness)
        {
            this.logger = _logger;
            this.mapper = _mapper;
            this.applicationConfigBusiness = _applicationConfigBusiness;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok();
        }

        [HttpGet]
        [Route("GetByKey")]
        public IActionResult GetByKey(string key)
        {
            return Ok();
        }
    }
}