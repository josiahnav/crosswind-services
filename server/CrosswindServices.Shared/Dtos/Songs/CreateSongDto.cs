using System.ComponentModel.DataAnnotations;

namespace CrosswindServices.Shared.Dtos.Songs;

public class CreateSongDto
{
    [Required(ErrorMessage = "The title is required")]
    [StringLength(30, ErrorMessage = "The title cannot be greater than 30 characters in length")]
    public string Title { get; init; } = "";
    [StringLength(100, ErrorMessage = "The composer cannot be greater than 100 characters in length")]
    public string? Composer { get; set; }
    [Range(0, 999.99)]
    public double? Bpm { get; set; }
}