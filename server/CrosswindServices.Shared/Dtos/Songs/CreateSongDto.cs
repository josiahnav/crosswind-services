using System.ComponentModel.DataAnnotations;

namespace CrosswindServices.Shared.Dtos.Songs;

public class CreateSongDto
{
    [Required(ErrorMessage = "The title is required.")]
    [StringLength(30, ErrorMessage = "The title cannot be greater than 30 characters in length.")]
    public string? Title { get; set; }
}