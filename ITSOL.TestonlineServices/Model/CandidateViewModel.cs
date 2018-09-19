

using System.Collections.Generic;

namespace ITSOL.TestonlineServices.Model
{
    public class CandidateViewModel
    {
        public List<string> SubjectNames { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
