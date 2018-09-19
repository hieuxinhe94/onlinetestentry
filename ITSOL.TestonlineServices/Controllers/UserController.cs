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
            return Ok(this.userBusiness.GetUsers());
        }

        [HttpPost]
        [Route("Insert")]
        public IActionResult Insert([FromBody] UserViewModel model)
        {
            if (ModelState.IsValid)
            {
               int status = this.userBusiness.Create(mapper.Map<User>(model));
                if (status == 1)
                {
                    return Ok(status);
                }
            }
            return BadRequest();
        }

    }
}