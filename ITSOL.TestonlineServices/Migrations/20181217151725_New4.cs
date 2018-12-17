using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ITSOL.TestonlineServices.Migrations
{
    public partial class New4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApplicationConfig",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Key = table.Column<string>(nullable: true),
                    Val = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationConfig", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Candidate",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserName = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Birthdate = table.Column<DateTime>(nullable: true),
                    Status = table.Column<bool>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    LastActivateDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Candidate", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Feedback",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    GuessId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedback", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "History",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Desc = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_History", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Quiz",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    TimeUpMinutes = table.Column<float>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: false),
                    Status = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quiz", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    LastActivateDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CandidateQuizAssign",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CandidateId = table.Column<int>(nullable: false),
                    QuizId = table.Column<int>(nullable: false),
                    DateStart = table.Column<DateTime>(nullable: true),
                    DateExprire = table.Column<DateTime>(nullable: true),
                    Status = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CandidateQuizAssign", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CandidateQuizAssign_Candidate_CandidateId",
                        column: x => x.CandidateId,
                        principalTable: "Candidate",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CandidateQuizAssign_Quiz_QuizId",
                        column: x => x.QuizId,
                        principalTable: "Quiz",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Question",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    QuizId = table.Column<int>(nullable: false),
                    IsMultiSelection = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Question_Quiz_QuizId",
                        column: x => x.QuizId,
                        principalTable: "Quiz",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CandidateQuizAssignAndResult",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CandidateQuizAssignId = table.Column<int>(nullable: false),
                    DateSubmited = table.Column<DateTime>(nullable: false),
                    AnsweredQuestionCount = table.Column<int>(nullable: false),
                    RightQuestionCount = table.Column<int>(nullable: false),
                    TotalQuestionCount = table.Column<int>(nullable: false),
                    Mark = table.Column<float>(nullable: false),
                    WorkingTimeMinues = table.Column<float>(nullable: false),
                    Status = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CandidateQuizAssignAndResult", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CandidateQuizAssignAndResult_CandidateQuizAssign_CandidateQuizAssignId",
                        column: x => x.CandidateQuizAssignId,
                        principalTable: "CandidateQuizAssign",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Answer",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    QuestionId = table.Column<int>(nullable: false),
                    IsRightAnswer = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Answer_Question_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Question",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "CandidateQuizAssignAndResultDetail",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CandidateQuizAssignAndResultId = table.Column<int>(nullable: false),
                    AnswerSeletectedId = table.Column<int>(nullable: false),
                    DateSelected = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CandidateQuizAssignAndResultDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CandidateQuizAssignAndResultDetail_Answer_AnswerSeletectedId",
                        column: x => x.AnswerSeletectedId,
                        principalTable: "Answer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_CandidateQuizAssignAndResultDetail_CandidateQuizAssignAndResult_CandidateQuizAssignAndResultId",
                        column: x => x.CandidateQuizAssignAndResultId,
                        principalTable: "CandidateQuizAssignAndResult",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.InsertData(
                table: "ApplicationConfig",
                columns: new[] { "Id", "Key", "Val" },
                values: new object[,]
                {
                    { 1, "APP_NAME", "ITSOL ONLINE TEST ENTRY" },
                    { 2, "VERSION", "V00.01" },
                    { 3, "GETTING_STARTED_MENU", "Getting started" },
                    { 4, "ABOUT_COMPANY", "<b>Html</b>" },
                    { 5, "CONTACTS", "<b>Html</b>" },
                    { 6, "GETTING_STARTED_MENU_STEP_1", "<b>Html</b>" },
                    { 7, "GETTING_STARTED_MENU_STEP_2", "<b>Html</b>" },
                    { 8, "GETTING_STARTED_MENU_STEP_3", "<b>Html</b>" }
                });

            migrationBuilder.InsertData(
                table: "Quiz",
                columns: new[] { "Id", "DateCreated", "DateModified", "Description", "Name", "Status", "TimeUpMinutes", "Title" },
                values: new object[,]
                {
                    { 1, new DateTime(2018, 12, 17, 22, 17, 25, 445, DateTimeKind.Local), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "This is IQ quiz ", "iq_01", true, 20f, "IQ Quiz 01" },
                    { 2, new DateTime(2018, 12, 17, 22, 17, 25, 445, DateTimeKind.Local), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "This is java quiz", "java_01", true, 20f, "Java Quiz 01" },
                    { 3, new DateTime(2018, 12, 17, 22, 17, 25, 445, DateTimeKind.Local), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "This is .Net quiz", "net_01", true, 20f, "NET Quiz 01" },
                    { 4, new DateTime(2018, 12, 17, 22, 17, 25, 445, DateTimeKind.Local), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "This is english quiz", "english_01", true, 20f, "English Quiz 01" },
                    { 5, new DateTime(2018, 12, 17, 22, 17, 25, 445, DateTimeKind.Local), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "This is english Gmat", "gmat_01", true, 10f, "Gmat Quiz 01" }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "CreatedDate", "Email", "LastActivateDate", "Name", "Password", "Status" },
                values: new object[,]
                {
                    { 1, new DateTime(2018, 12, 17, 22, 17, 25, 442, DateTimeKind.Local), "emp1@email.com", null, "emp1", "123", 1 },
                    { 2, new DateTime(2018, 12, 17, 22, 17, 25, 444, DateTimeKind.Local), "emp2@email.com", null, "emp2", "123", 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answer_QuestionId",
                table: "Answer",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_CandidateQuizAssign_CandidateId",
                table: "CandidateQuizAssign",
                column: "CandidateId");

            migrationBuilder.CreateIndex(
                name: "IX_CandidateQuizAssign_QuizId",
                table: "CandidateQuizAssign",
                column: "QuizId");

            migrationBuilder.CreateIndex(
                name: "IX_CandidateQuizAssignAndResult_CandidateQuizAssignId",
                table: "CandidateQuizAssignAndResult",
                column: "CandidateQuizAssignId");

            migrationBuilder.CreateIndex(
                name: "IX_CandidateQuizAssignAndResultDetail_AnswerSeletectedId",
                table: "CandidateQuizAssignAndResultDetail",
                column: "AnswerSeletectedId");

            migrationBuilder.CreateIndex(
                name: "IX_CandidateQuizAssignAndResultDetail_CandidateQuizAssignAndResultId",
                table: "CandidateQuizAssignAndResultDetail",
                column: "CandidateQuizAssignAndResultId");

            migrationBuilder.CreateIndex(
                name: "IX_Question_QuizId",
                table: "Question",
                column: "QuizId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationConfig");

            migrationBuilder.DropTable(
                name: "CandidateQuizAssignAndResultDetail");

            migrationBuilder.DropTable(
                name: "Feedback");

            migrationBuilder.DropTable(
                name: "History");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Answer");

            migrationBuilder.DropTable(
                name: "CandidateQuizAssignAndResult");

            migrationBuilder.DropTable(
                name: "Question");

            migrationBuilder.DropTable(
                name: "CandidateQuizAssign");

            migrationBuilder.DropTable(
                name: "Candidate");

            migrationBuilder.DropTable(
                name: "Quiz");
        }
    }
}
