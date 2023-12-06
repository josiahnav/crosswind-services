using CrosswindServices.Data;
using CrosswindServices.Data.Entities;
using CrosswindServices.Repository.Tests.Helpers;

namespace CrosswindServices.Repository.Tests;

public class SongRepositoryTests
{
    private readonly CrosswindServicesDbContext _context;
    private readonly SongRepository _repository;

    private readonly List<Song> _songsStub = new List<Song>
    {
        new()
        {
            Id = 1,
            Title = "Song 1",
            Created = new DateTime(2023, 10, 31),
            LastScheduled = new DateTime(2023, 10, 31)
        },
        new()
        {
            Id = 2,
            Title = "Song 2",
            Created = new DateTime(2023, 10, 31),
            LastScheduled = new DateTime(2023, 10, 31)
        },
        new()
        {
            Id = 3,
            Title = "Song 3",
            Created = new DateTime(2023, 10, 31),
            LastScheduled = new DateTime(2023, 10, 31)
        }
    };

    public SongRepositoryTests()
    {
        _context = DbContextHelper.GetDbContextMock();
        _repository = new SongRepository(_context);
    }

    [Fact]
    public async Task GetAllSongs_ReturnsResult_WhenExists()
    {
        // Arrange
        _context.Songs.AddRange(_songsStub);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetAllSongsAsync();

        // Assert
        Assert.NotEmpty(result);
        Assert.Equal(_songsStub.Count, result.Count);
        Assert.Equal(_songsStub, result);
    }

    [Fact]
    public async Task GetAllSongs_ReturnsEmptyList_WhenDoesNotExist()
    {
        // Arrange
        
        // Act
        var result = await _repository.GetAllSongsAsync();

        // Assert
        Assert.IsType<List<Song>>(result);
        Assert.Empty(result);
    }

    [Fact]
    public async Task CreateSongAsync_ReturnsSong_WhenCreated()
    {
        // Arrange
        var song = new Song { Title = "Song 1" };

        // Act
        var result = await _repository.CreateSongAsync(song);

        // Assert
        Assert.NotNull(result);
        Assert.IsType<Song>(result);
        Assert.Equal(song.Title, result.Title);
    }

    [Fact]
    public async Task DeleteSongAsync_RemovesSong_WhenSuccessful()
    {
        // Arrange
        const int id = 1;
        _context.Songs.AddRange(_songsStub);
        await _context.SaveChangesAsync();

        // Act
        await _repository.DeleteSongAsync(id);

        // Assert
        Assert.Equal(2, _context.Songs.ToList().Count);
        Assert.DoesNotContain(_context.Songs.ToList(), s => s.Id == id);
    }

    [Fact]
    public async Task DeleteSongAsync_ThrowsKeyNotFoundException_WhenNotFound()
    {
        // Arrange
        const int id = 4;
        _context.Songs.AddRange(_songsStub);
        await _context.SaveChangesAsync();

        // Act

        // Assert
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _repository.DeleteSongAsync(id));
    }
}