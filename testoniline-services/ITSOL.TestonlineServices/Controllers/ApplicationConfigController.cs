
using AutoMapper;
using ITSOL.Business.Interfaces;
using ITSOL.TestonlineServices.Configuraions;
using ITSOL.TestonlineServices.Model;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using TSOL.Domain.Entities;

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
            return Ok(applicationConfigBusiness.GetAll());
        }
        
        [HttpGet]
        [Route("GetByKey")]
        public IActionResult GetByKey(string key)
        {
            return Ok(applicationConfigBusiness.getByKey(key));
        }

        [HttpPost]
        [Route("InsertOrUpdate")]
        public IActionResult InsertOrUpdate([FromBody] ApplicationConfigViewModel viewmodel)
        {
            if (ModelState.IsValid)
            {
                return Ok(applicationConfigBusiness.InsertOrUpdate(mapper.Map<ApplicationConfig>(viewmodel)));
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("InsertOrUpdateAll")]
        public IActionResult InsertOrUpdateAll([FromBody] ApplicationConfigListViewModel viewmodel)
        {
            if (ModelState.IsValid)
            {
                var tmp = viewmodel.ApplicationConfigs.Select(t => new ApplicationConfig { Key = t.Key, Val = t.Val }).ToList();
                return Ok(applicationConfigBusiness.InsertOrUpdateAll(tmp));
            }
            return BadRequest();
        }
    }

}