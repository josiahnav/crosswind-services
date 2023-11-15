using CrosswindServices.Data;
using CrosswindServices.Data.Entities;
using CrosswindServices.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CrosswindServices.Repository;

public class SongRepository : ISongRepository
{
    private readonly CrosswindServicesDbContext _context;
    
    public SongRepository(CrosswindServicesDbContext context)
    {
        _context = context;
    }
    
    public async Task<List<Song>> GetAllSongsAsync()
    {
        return await _context.Songs.ToListAsync();
    }

    public async Task<Song?> GetSongAsync(int id)
    {
        return await _context.Songs.FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<Song> CreateSongAsync(Song song)
    {
        song.Created = DateTime.UtcNow;
        _context.Songs.Add(song);
        await _context.SaveChangesAsync();
        return song;
    }
}