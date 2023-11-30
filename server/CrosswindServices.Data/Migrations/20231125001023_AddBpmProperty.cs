using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrosswindServices.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddBpmProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "bpm",
                table: "songs",
                type: "DECIMAL(5,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "bpm",
                table: "songs");
        }
    }
}
