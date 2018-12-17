using System.Collections.Generic;
using TSOL.Domain.Entities;

namespace ITSOL.Business.Interfaces
{
   public interface ISummaryBusiness
    {
      ICollection<CandidateQuizAssignAndResult>  GetAllQuizAssignedResult();
      ICollection<CandidateQuizAssign> GetAllQuizAssigned();
      ICollection<CandidateQuizAssignAndResult> GetQuizResultByCandidateName(string candidateName);
    }
}
