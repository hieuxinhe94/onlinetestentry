using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITSOL.TestonlineServices.Configuraions
{
    public class HandleGlobalExeptionMiddleware
    {
        private readonly RequestDelegate _next;

        public HandleGlobalExeptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                //httpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                //httpContext.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
                //httpContext.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Accept");
                //httpContext.Response.Headers.Add("Access-Control-Allow-Methods", "POST,GET,PUT,PATCH,DELETE,OPTIONS");

                await _next.Invoke(httpContext);
            }
            catch (Exception ex)
            {
                throw;
                // TODO: hanle error 
            }
        }
    }
}

