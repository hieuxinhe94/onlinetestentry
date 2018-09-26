
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
            new Quiz { Id = 1, Name = "iq", Title = "IQ Quiz", Description = "This is IQ quiz", TimeUpMinutes = 20 },
            new Quiz { Id = 2, Name = "java", Title = "Java Quiz", Description = "This is java quiz", TimeUpMinutes = 20 },
            new Quiz { Id = 3, Name = "english", Title = "English Quiz", Description = "This is english quiz", TimeUpMinutes = 20 },
            new Quiz { Id = 4, Name = "gmat", Title = "Gmat Quiz", Description = "This is english Gmat", TimeUpMinutes = 20 }
            );

            
            base.OnModelCreating(modelBuilder);
        }
    }
}
