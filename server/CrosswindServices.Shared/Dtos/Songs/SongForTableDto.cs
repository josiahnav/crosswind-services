namespace CrosswindServices.Shared.Dtos.Songs;

public class SongForTableDto
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public double? Bpm { get; set; }
    public DateTime Created { get; set; }
    public DateTime? LastScheduled { get; init; }
}