using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using TSOL.DAL.Base;
using TSOL.Domain;

namespace TSOL.DAL.Repository
{
     public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : BaseEntity
    {
        protected ApplicationContext _context { get; set; }

        public RepositoryBase(ApplicationContext context)
        {
            _context = context;
            
        }

        public int Add(T entity)
        {
            try
            {
                _context.Add(entity);
                Save();
                return 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public IEnumerable<T> FindWithCondition(Expression<Func<T, bool>> expression)
        {
            // lấy kết quả ra dần dần.
             return this._context.Set<T>().Where(expression);
        }

        public IEnumerable<T> GetAll()
        {
            return this._context.Set<T>();
        }

        public void Save()
        {
            this._context.SaveChanges();
        }

        public T GetById(int id)
        {
            return this._context.Set<T>().Where(t => t.Id == id ).FirstOrDefault();
        }

        public int Update(T enity)
        {
            try
            {
                _context.Update(enity);
                Save();
                return 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int id)
        {
            try
            {
                T t = GetById(id);
                if (t!= null)
                {
                    _context.Remove(t);
                    Save();
                    return 1;
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddMany(List<T> ls)
        {
            try
            {
                _context.AddRange(ls);
                Save();
                return 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateMany(List<T> ls)
        {
            try
            {
                _context.UpdateRange(ls);
                Save();
                return 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleleMany(List<int> ls)
        {
            throw new NotImplementedException();
        }

        public DbSet<T> Get()
        {
            return this._context.Set<T>();
        }
    }
}
