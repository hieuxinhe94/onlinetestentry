
using System.Collections.Generic;

namespace ITSOL.TestonlineServices.Model
{
    public class ApplicationConfigViewModel
    {
        public int Id { get; set; }
        public string Key { get; set; }

        public string Val { get; set; }
    }

    public class ApplicationConfigListViewModel
    {
        public ICollection<ApplicationConfigViewModel> ApplicationConfigs { get; set; }
    }
}
