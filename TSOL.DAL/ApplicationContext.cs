
using Microsoft.EntityFrameworkCore;
using TSOL.Domain.Entities;

namespace TSOL.DAL
{
   public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        public DbSet<Answer> Answer { get; set; }
        public DbSet<Question> Question { get; set; }
        public DbSet<Quiz> Quiz { get; set; }
        public DbSet<Candidate> Candidate { get; set; }
        public DbSet<CandidateQuizAssign> CandidateQuizAssign { get; set; }
        public DbSet<CandidateQuizAssignAndResult> CandidateQuizAssignAndResult { get; set; }
        public DbSet<CandidateQuizAssignAndResultDetail> CandidateQuizAssignAndResultDetail { get; set; }
        public DbSet<ApplicationConfig> ApplicationConfig { get; set; }
        public DbSet<Feedback> Feedback { get; set; }
        public DbSet<History> History { get; set; }
        public DbSet<User> User { get; set; }

    }
}
