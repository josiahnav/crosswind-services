using System.ComponentModel.DataAnnotations;

namespace CrosswindServices.Data.Entities;

public class Song
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string? Composer { get; set; }
    public double? Bpm { get; set; }
    public DateTime Created { get; set; }
    public DateTime? LastScheduled { get; set; }
}