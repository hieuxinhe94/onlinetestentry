using AutoMapper;
using ITSOL.TestonlineServices.Model;
using TSOL.Domain.Entities;

namespace ITSOL.TestonlineServices.Configuraions
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<LoginViewModel, User>()
                 .ForMember(dest => dest.Id, config => config.Ignore())
             .ReverseMap();
            // Mapper : ViewModel -> Entities 

            CreateMap<CandidateViewModel, Candidate>();
        }

    }

}
