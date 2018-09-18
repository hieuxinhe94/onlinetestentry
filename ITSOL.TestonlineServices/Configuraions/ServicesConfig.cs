

using AutoMapper;
using ITSOL.Business.Implemented;
using ITSOL.Business.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using TSOL.DAL;
using TSOL.DAL.Base;
using TSOL.DAL.Repository;
using TSOL.DAL.Repository.RepositoryDomain;

namespace ITSOL.TestonlineServices.Configuraions
{
    public static class ServicesConfig
    {
        public static void AddDefaultRepositories(this IServiceCollection services)
        {
            // Register dependency of app repository here

            services.AddScoped<ApplicationContext>();
            // DI for repository
            services.AddScoped<IUserRepository, UserRepository>(); 
            services.AddScoped<ICandidateRepository, CandidateRepository>();
            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
            // Dependency injection
            services.AddScoped(typeof(IUserBusiness), typeof(UserBusiness));
            services.AddScoped<ICandidateBusiness, CandidateBusiness>();

            services.AddCors(options =>
            {
                options.AddPolicy("", builder => builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .Build());
            });
        }
        public static void AddExtensionServices(this IServiceCollection services)
        {
            // Register dependency of extension here

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


            services.AddAutoMapper();
            Mapper.Initialize(cfg => cfg.AddProfile<AutoMapperConfig>());

            services.AddSingleton<ILoggerManager, LoggerManager>();

        }
    }
}
