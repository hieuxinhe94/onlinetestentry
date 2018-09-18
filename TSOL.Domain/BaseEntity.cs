using System;
using System.ComponentModel.DataAnnotations;

namespace TSOL.Domain
{
    public abstract class BaseEntity
    {
        [Key]
        public int Id { get; set; }

    }
}
