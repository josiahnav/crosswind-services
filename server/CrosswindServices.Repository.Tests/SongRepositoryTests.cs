using CrosswindServices.Data;
using CrosswindServices.Data.Entities;
using CrosswindServices.Repository.Tests.Helpers;

namespace CrosswindServices.Repository.Tests;

public class SongRepositoryTests
{
    private readonly CrosswindServicesDbContext _context;
    private readonly SongRepository _repository;

    public SongRepositoryTests()
    {
        _context = DbContextHelper.GetDbContextMock();
        _repository = new SongRepository(_context);
    }

    [Fact]
    public async Task GetAllSongs_ReturnsResult_WhenExists()
    {
        // Arrange
        var songs = new List<Song>
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
        _context.Songs.AddRange(songs);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetAllSongsAsync();

        // Assert
        Assert.NotEmpty(result);
        Assert.Equal(songs.Count, result.Count);
        Assert.Equal(songs, result);
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
}