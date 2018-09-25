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
            CreateMap<UserViewModel, User>();
            CreateMap<SubjectViewModel, Quiz>();
            CreateMap<QuizViewModel, Quiz>();
            CreateMap<QuestionViewModel, Question>();
            CreateMap<AnswerViewModel, Answer>();
            CreateMap<ApplicationConfigViewModel, ApplicationConfig>();
        }

    }

}
