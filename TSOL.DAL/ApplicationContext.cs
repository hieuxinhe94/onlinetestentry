
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
            new User { Id= 1, Name = "emp1", Email = "emp1@email.com", Password = "123" },
            new User { Id = 2, Name = "emp2", Email = "emp2@email.com", Password = "123" });

            modelBuilder.Entity<Quiz>().HasData(
            new Quiz { Id = 1, Name = "iq_01", Title = "IQ Quiz 01", Description = "This is IQ quiz ", TimeUpMinutes = 20 },
            new Quiz { Id = 2, Name = "java_01", Title = "Java Quiz 01", Description = "This is java quiz", TimeUpMinutes = 20 },
            new Quiz { Id = 3, Name = "net_01", Title = "NET Quiz 01", Description = "This is .Net quiz", TimeUpMinutes = 20 },
            new Quiz { Id = 4, Name = "english_01", Title = "English Quiz 01", Description = "This is english quiz", TimeUpMinutes = 20 },
            new Quiz { Id = 5, Name = "gmat_01", Title = "Gmat Quiz 01", Description = "This is english Gmat", TimeUpMinutes = 10 }
            );

            
            base.OnModelCreating(modelBuilder);
        }
    }
}
