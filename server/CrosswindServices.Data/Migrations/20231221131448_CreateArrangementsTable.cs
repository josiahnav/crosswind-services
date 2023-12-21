using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrosswindServices.Data.Migrations
{
    /// <inheritdoc />
    public partial class CreateArrangementsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "bpm",
                table: "songs");

            migrationBuilder.CreateTable(
                name: "arrangements",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    description = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    lengthminutes = table.Column<int>(name: "length_minutes", type: "int", nullable: false),
                    lengthseconds = table.Column<int>(name: "length_seconds", type: "int", nullable: false),
                    timesignature = table.Column<string>(name: "time_signature", type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    bpm = table.Column<decimal>(type: "DECIMAL(5,2)", nullable: true),
                    songid = table.Column<int>(name: "song_id", type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_arrangements", x => x.id);
                    table.ForeignKey(
                        name: "FK_arrangements_songs_song_id",
                        column: x => x.songid,
                        principalTable: "songs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_arrangements_song_id",
                table: "arrangements",
                column: "song_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "arrangements");

            migrationBuilder.AddColumn<decimal>(
                name: "bpm",
                table: "songs",
                type: "DECIMAL(5,2)",
                nullable: true);
        }
    }
}
