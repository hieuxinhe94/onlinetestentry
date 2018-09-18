  
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using TSOL.Domain;

namespace TSOL.DAL.Base
{
    public interface IRepositoryBase<T> where T : BaseEntity
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> FindWithCondition(Expression<Func<T, bool>> expression);
        T GetById(int id);
        int Add(T entity);
        int Update(T enity);
        int Delete(int id);
        int AddMany(List<T> ls);
        int UpdateMany(List<T> ls);
        int DeleleMany(List<int> ls);

    }
}
