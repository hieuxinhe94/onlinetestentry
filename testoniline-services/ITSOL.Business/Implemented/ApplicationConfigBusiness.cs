using System.Collections.Generic;
using System.Linq;
using ITSOL.Business.Interfaces;
using TSOL.DAL.Repository.RepositoryDomain;
using TSOL.Domain.Entities;

namespace ITSOL.Business.Implemented
{
    public class ApplicationConfigBusiness : IApplicationConfigBusiness
    {
        private IApplicationConfigRepository applicationConfigRepository;
        public ApplicationConfigBusiness(IApplicationConfigRepository _applicationConfigRepository)
        {
            applicationConfigRepository = _applicationConfigRepository;
        }


        public ICollection<ApplicationConfig> GetAll()
        {
            return applicationConfigRepository.GetAll().ToList();
        }

        public ApplicationConfig getByKey(string key)
        {
            key = key.ToLower();
            return applicationConfigRepository.FindWithCondition(t => t.Key.Equals(key)).FirstOrDefault();
        }

        public int InsertOrUpdate(ApplicationConfig entity)
        {
            var existsEntity = this.applicationConfigRepository.FindWithCondition(t => t.Key == entity.Key).FirstOrDefault();
            if (existsEntity != null)
            {
                entity.Id = entity.Id;
                return this.applicationConfigRepository.Update(entity);
            }
             return this.applicationConfigRepository.Add(entity);
        }
    }
}
