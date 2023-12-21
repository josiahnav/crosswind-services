namespace CrosswindServices.Data.Entities;

public class Arrangement
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public int LengthMinutes { get; set; } = 0;
    public int LengthSeconds { get; set; } = 0;
    public string? TimeSignature { get; set; }
    public double? Bpm { get; set; }
    
    #region Navigation Properties
    
    public int SongId { get; set; }
    public Song Song { get; set; }
    
    #endregion
}