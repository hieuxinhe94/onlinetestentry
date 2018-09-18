﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TSOL.DAL;

namespace ITSOL.TestonlineServices.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20180918071102_FirstInitial")]
    partial class FirstInitial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("TSOL.Domain.Entities.Answer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content");

                    b.Property<bool>("IsRightAnswer");

                    b.Property<int>("QuestionId");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("Answer");
                });

            modelBuilder.Entity("TSOL.Domain.Entities.ApplicationConfig", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Key");

                    b.Property<string>("Value");

                    b.HasKey("Id");

                    b.ToTable("ApplicationConfig");
                });

            modelBuilder.Entity("TSOL.Domain.Entities.Candidate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<DateTime?>("Birthdate");

                    b.Property<DateTime?>("CreatedDate");

                    b.Property<string>("Email");

                    b.Property<string>("FullName");

                    b.Property<DateTime?>("LastActivateDate");

                    b.Property<string>("Password");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("Status");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.ToTable("Candidate");
                });

            modelBuilder.Entity("TSOL.Domain.Entities.CandidateQuizAssign", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CandidateId");

                    b.Property<DateTime?>("DateExprire");

                    b.Property<DateTime?>("DateStart");

                    b.Property<int>("QuizId");

                    b.Property<bool>("Status");

                    b.HasKey("Id");

                    b.HasIndex("CandidateId");

                    b.HasIndex("QuizId");

                    b.ToTable("CandidateQuizAssign");
                });

            modelBuilder.Entity("TSOL.Domain.Entities.CandidateQuizAssignAndResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AnsweredQuestionCount");

                    b.Property<int>("CandidateQuizAssignId");

                    b.Property<DateTime>("DateSubmited");

                    b.Property<float>("Mark");

                    b.Property<int>("RightQuestionCount");

                    b.Property<bool>("Status");

                    b.Property<int>("TotalQuestionCount");

                    b.Property<float>("WorkingTimeMinues");

                    b.HasKey("Id");

                    b.HasIndex("CandidateQuizAssignId");

                    b.ToTable("CandidateQuizAssignAndResult");
                });

            modelBuilder.Entity("TSOL.Domain.Entities.CandidateQuizAssignAndResultDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AnswerSeletectedId");

                    b.Property<int>("CandidateQuizAssignAndResultId");

                    b.Property<DateTime>("DateSelected");

                    b.HasKey("Id");

                    b.HasIndex("AnswerSeletectedId");

                    b.HasIndex("CandidateQuizAssignAndResultId");

                    b.ToTable("CandidateQuizAssignAndResultDetail");
                });

            modelBuilder.Entity("TSOL.Domain.Entities.Feedback", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content");

                    b.Property<int?>("GuessId");

                    b.Property<string>("Phone");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Feedback");
                });

            modelBuilder.Entity("TSOL.Domain.Entities.History", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Desc");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("History");
                });

            modelBuilder.Entity("TSOL.Domain.Entities.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content");

                    b.Property<bool>("IsMultiSelection");

                    b.Property<int>("QuizId");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("QuizId");

                    b.ToTable("Question");
                });

            modelBuilder.Entity("TSOL.Domain.Entities.Quiz", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateModified");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<bool>("Status");

                    b.Property<float>("TimeUpMinutes");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Quiz");
                });

            modelBuilder.Entity("TSOL.Domain.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Email");

                    b.Property<DateTime>("LastActivateDate");

                    b.Property<string>("Name");

                    b.Property<string>("Password");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("TSOL.Domain.Entities.Answer", b =>
                {
                    b.HasOne("TSOL.Domain.Entities.Question", "Question")
                        .WithMany()
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TSOL.Domain.Entities.CandidateQuizAssign", b =>
                {
                    b.HasOne("TSOL.Domain.Entities.Candidate", "Candidate")
                        .WithMany()
                        .HasForeignKey("CandidateId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("TSOL.Domain.Entities.Quiz", "Quiz")
                        .WithMany()
                        .HasForeignKey("QuizId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TSOL.Domain.Entities.CandidateQuizAssignAndResult", b =>
                {
                    b.HasOne("TSOL.Domain.Entities.CandidateQuizAssign", "CandidateQuizAssign")
                        .WithMany()
                        .HasForeignKey("CandidateQuizAssignId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TSOL.Domain.Entities.CandidateQuizAssignAndResultDetail", b =>
                {
                    b.HasOne("TSOL.Domain.Entities.Answer", "AnswerSeletected")
                        .WithMany()
                        .HasForeignKey("AnswerSeletectedId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("TSOL.Domain.Entities.CandidateQuizAssignAndResult", "CandidateQuizAssignAndResult")
                        .WithMany()
                        .HasForeignKey("CandidateQuizAssignAndResultId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TSOL.Domain.Entities.Question", b =>
                {
                    b.HasOne("TSOL.Domain.Entities.Quiz", "Quiz")
                        .WithMany()
                        .HasForeignKey("QuizId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
