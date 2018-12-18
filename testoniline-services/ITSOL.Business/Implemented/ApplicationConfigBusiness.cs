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

        public int InsertOrUpdateAll(ICollection<ApplicationConfig> entities)
        {
            var oldList = this.applicationConfigRepository.GetAll();
            List<string> keysToUpdate = entities.Select(t => t.Key).ToList();
            foreach (var item in oldList)
            {
                if (keysToUpdate.Contains(item.Key))
                {
                    item.Val = entities.FirstOrDefault(t => t.Key == item.Key).Val;
                }
            }

            return this.applicationConfigRepository.UpdateMany(oldList.ToList());
        }
    }
}
