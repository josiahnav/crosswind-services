using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrosswindServices.Data.Migrations
{
    /// <inheritdoc />
    public partial class ComposerSongProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "composer",
                table: "songs",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "composer",
                table: "songs");
        }
    }
}
