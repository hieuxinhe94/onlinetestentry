using System;
using System.IO;
using System.Text;
using AutoMapper; 
using ITSOL.TestonlineServices.Configuraions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using NLog.Extensions.Logging;
using TSOL.DAL;
using TSOL.DAL.Repository;
using TSOL.DAL.Repository.RepositoryDomain;

namespace ITSOL.TestonlineServices
{
    public class Startup
    {
        public Startup(IConfiguration configuration, ILoggerFactory loggerFactory)
        {
            loggerFactory.ConfigureNLog(Directory.GetCurrentDirectory() + "/nlog.config");
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors();
            services.AddCors(options => {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            // Get connection from configuration file and named HpConnection;
            var connection = Configuration.GetConnectionString("HpConnection");
            // Change to assemblly of Dal library project
            services.AddDbContext<ApplicationContext>(options =>
            options.UseSqlServer(connection, b => b.MigrationsAssembly("ITSOL.TestonlineServices")));

            ServicesConfig.AddDefaultRepositories(services);
            ServicesConfig.AddExtensionServices(services);

            services.AddAutoMapper();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }
      

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("CorsPolicy");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseMiddleware<HandleGlobalExeptionMiddleware>();
            app.UseAuthentication();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Swagger API");
            });

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
