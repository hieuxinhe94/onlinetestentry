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
        [Route("GetQuizAssigned")]
        public IActionResult GetQuizAssigned([FromBody] int id)
        {
            return Ok(candidateBusiness.GetQuizAssigned(id));
        }

        [HttpGet]
        [Route("getCandidateByName")]
        public IActionResult getCandidateByName( string name)
        {
            return Ok(candidateBusiness.GetCandidateInfo(name));
        }

        [HttpPost]
        [Route("InsertOrUpdate")]
        public IActionResult InsertOrUpdate([FromBody] CandidateViewModel candidateVm )
        {
            if (ModelState.IsValid)
            {
                return Ok(candidateBusiness.RegisterNewOrUpdateCandidate(mapper.Map<Candidate>(candidateVm), candidateVm.SubjectNames));
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("Delete")]
        public IActionResult Delete( [FromBody] int id)
        {
            return Ok(candidateBusiness.RemoveCandidate(id));
        }
    }
}