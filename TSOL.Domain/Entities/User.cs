﻿
using System;

namespace TSOL.Domain.Entities
{
    public class User : BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public int Status { get; set; } = 1;
        public DateTime CreatedDate { get; set; }
        public DateTime LastActivateDate { get; set; }

    }
}
