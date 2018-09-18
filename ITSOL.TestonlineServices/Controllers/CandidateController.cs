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
    public class CandidateController : ControllerBase
    {
        private ILoggerManager logger;
        private readonly IMapper mapper;
        private ICandidateBusiness candidateBusiness;
        public CandidateController(ILoggerManager _logger, IMapper _mapper, ICandidateBusiness _candidateBusiness)
        {
            this.logger = _logger;
            this.mapper = _mapper;
            this.candidateBusiness = _candidateBusiness;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(candidateBusiness.GetAll());
        }

        [HttpPost]
        public IActionResult Insert([FromBody] CandidateViewModel candidateVm )
        {
            if (ModelState.IsValid)
            {
                return Ok(candidateBusiness.RegisterNewCandidate(mapper.Map<Candidate>(candidateVm)));
            }
            return BadRequest();
        }
    }
}