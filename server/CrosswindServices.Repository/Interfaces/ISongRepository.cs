using CrosswindServices.Data.Entities;

namespace CrosswindServices.Repository.Interfaces;

public interface ISongRepository
{
    Task<List<Song>> GetAllSongsAsync();
    Task<Song?> GetSongAsync(int id);
    Task<Song> CreateSongAsync(Song song);
    Task DeleteSongAsync(int id);
}