using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using AutoMapper.Configuration;
using ITSOL.Business.Interfaces;
using ITSOL.TestonlineServices.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TSOL.Domain.Entities;

namespace ITSOL.TestonlineServices.Controllers
{ 
    [ApiController]
    [Produces("application/json")]
    [Route("api/Token")]
    public class TokenController : ControllerBase
    {
        private Microsoft.Extensions.Configuration.IConfiguration config;
        private IUserBusiness userBusiness;
        private ICandidateBusiness candidateBusiness;
        private readonly IMapper mapper;

        public TokenController(Microsoft.Extensions.Configuration.IConfiguration _config, IMapper _mapper, IUserBusiness _userBusiness, ICandidateBusiness _candidateBusiness)
        {
            this.config = _config;
            this.mapper = _mapper;
            this.userBusiness = _userBusiness;
            this.candidateBusiness = _candidateBusiness;
        }

        [AllowAnonymous]
        [Route("CreateToken")]
        [HttpPost]
        public IActionResult CreateToken([FromBody] LoginViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.ToArray());
            }
            IActionResult respon = Unauthorized();
            var isValid = userBusiness.Authenticate(viewModel.Name, viewModel.Password);
            if (isValid)
            {
                var thisUser = userBusiness.GetUser(1);
                var viewModelFromEntity = mapper.Map<User>(thisUser);
                var defaultRoles = "GUESS"; // SET your user role here!
                var tokenStr = BuildToken(viewModelFromEntity, defaultRoles);
                // respon = Ok(new { token = tokenStr, message = "another message" });
                respon = Ok(tokenStr);
            }
            return respon;
        }

        private string BuildToken(User myUser, string Roles)
        {

            IdentityOptions _options = new IdentityOptions();
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, myUser.Name ),
                new Claim(JwtRegisteredClaimNames.Email, myUser.Email),
               
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(_options.ClaimsIdentity.UserNameClaimType, myUser.Name),
                new Claim(ClaimTypes.Role, Roles)
              };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            var token = new JwtSecurityToken(
              config["Jwt:Issuer"],
              config["Jwt:Issuer"],
              claims, expires: DateTime.Now.AddMinutes(20),
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}