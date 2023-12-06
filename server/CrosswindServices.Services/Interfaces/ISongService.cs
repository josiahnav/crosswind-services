using CrosswindServices.Shared.Dtos.Songs;

namespace CrosswindServices.Services.Interfaces;

public interface ISongService
{
    Task<List<SongForTableDto>> GetAllSongsForTableAsync();
    Task<SongForTableDto?> GetSongForTableAsync(int id);
    Task<SongForTableDto> CreateSongAsync(CreateSongDto createSongDto);
    Task DeleteSongAsync(int id);
}