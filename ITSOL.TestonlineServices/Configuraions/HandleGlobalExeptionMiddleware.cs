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

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (Exception ex)
            {
                throw;
                // TODO: hanle error 
            }
        }
    }
}

