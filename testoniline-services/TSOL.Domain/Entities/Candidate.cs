

using System;

namespace TSOL.Domain.Entities
{
    public class Candidate : BaseEntity
    {
        public string UserName { get; set; }
        public string Password { get; set; }

        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public DateTime ? Birthdate { get; set; }
         

        public bool Status { get; set; } = true;
        public DateTime ? CreatedDate { get; set; }  
        public DateTime ? LastActivateDate { get; set; }  
    }
}
