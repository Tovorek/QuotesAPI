using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuotesAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Quotes",
                columns: table => new
                {
                    No = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuoteType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Sales = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Premium = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quotes", x => x.No);
                });

            migrationBuilder.InsertData(
                table: "Quotes",
                columns: new[] { "No", "Description", "DueDate", "Premium", "QuoteType", "Sales" },
                values: new object[,]
                {
                    { 1, "This is auto insurance", new DateTime(2010, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 240.00m, "Auto", "John" },
                    { 2, "This is auto insurance", new DateTime(2010, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 240.00m, "Auto", "John" },
                    { 3, "This is auto insurance", new DateTime(2011, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 300.00m, "Auto", "Mary" },
                    { 4, "This is house insurance", new DateTime(2013, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 116.00m, "House", "John" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Quotes");
        }
    }
}
