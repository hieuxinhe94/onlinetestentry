using System;
using System.IO;
using System.Text;
using AutoMapper;
using ITSOL.Business.Implemented;
using ITSOL.Business.Interfaces;
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
           

            // Get connection from configuration file and named HpConnection;
            var connection = Configuration.GetConnectionString("HpConnection");
            // Change to assemblly of Dal library project
            services.AddDbContext<ApplicationContext>(options =>
            options.UseSqlServer(connection, b => b.MigrationsAssembly("ITSOL.TestonlineServices")));
 


            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.TokenValidationParameters =
                           new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                           {
                               ValidateIssuer = true,
                               ValidateAudience = true,
                               ValidateLifetime = true,
                               ValidateIssuerSigningKey = true,
                               ValidIssuer = Configuration["Jwt:Issuer"],
                               ValidAudience = Configuration["Jwt:Issuer"],
                               IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                           };
                    });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Swashbuckle.AspNetCore.Swagger.Info
                {
                    Version = "v1",
                    Title = "Basic Net Core Enterprise Structure",
                    Description = "Develop by HieuPham  ",
                    TermsOfService = "None",
                    Contact = new Swashbuckle.AspNetCore.Swagger.Contact()
                    {
                        Name = "hieu pham",
                        Email = "hieuxinhe94@gmail.com",
                        Url = "www.github.com/hieuxinhe94"
                    }
                });
            });

            //Automapper profile resigter
            Mapper.Initialize(cfg => cfg.AddProfile<AutoMapperConfig>());
             

            ConfigureLoggerService(ref services);
            ConfigureDependencyService(ref services);
            services.AddAutoMapper();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }
        public static void ConfigureLoggerService(ref IServiceCollection services)
        {
            services.AddSingleton<ILoggerManager, LoggerManager>();

        }
        public static void ConfigureDependencyService(ref IServiceCollection services)
        {
            services.AddSingleton<ICandidateRepository, CandidateRepository>();
            services.AddSingleton<IRepositoryWrapper, RepositoryWrapper>();


            services.AddSingleton<ICandidateBusiness, CandidateBusiness>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
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
