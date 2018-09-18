using AutoMapper;
using ITSOL.Business.Interfaces;
using ITSOL.TestonlineServices.Configuraions;
using Microsoft.AspNetCore.Mvc;

namespace ITSOL.TestonlineServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private ILoggerManager logger;
        private readonly IMapper mapper;
        private IUserBusiness userBusiness;

        public UserController(ILoggerManager _logger, IMapper _mapper, IUserBusiness _userBusiness)
        {
            this.logger = _logger;
            this.mapper = _mapper;
            this.userBusiness = _userBusiness;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok();
        }


    }
}