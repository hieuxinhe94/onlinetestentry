using System.Collections.Generic;
using TSOL.Domain.Entities;

namespace ITSOL.Business.Interfaces
{
   public interface IApplicationConfigBusiness
    {
        ICollection<ApplicationConfig> GetAll();
        ApplicationConfig getByKey(string key);
        int InsertOrUpdate(ApplicationConfig entity);
        int InsertOrUpdateAll(ICollection<ApplicationConfig> entities);
    }
}
