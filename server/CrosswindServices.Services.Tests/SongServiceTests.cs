using AutoMapper;
using CrosswindServices.Data.Entities;
using CrosswindServices.Repository.Interfaces;
using CrosswindServices.Services.Interfaces;
using CrosswindServices.Services.Profiles;
using CrosswindServices.Shared.Dtos.Songs;
using Moq;

namespace CrosswindServices.Services.Tests;

public class SongServiceTests
{
    private readonly Mock<ISongRepository> _songRepositoryMock;
    private readonly IMapper _mapper;
    private readonly ISongService _service;

    public SongServiceTests()
    {
        _songRepositoryMock = new Mock<ISongRepository>();
        var config = new MapperConfiguration(cfg => { cfg.AddProfile<SongProfile>(); });
        _mapper = config.CreateMapper();
        _service = new SongService(_songRepositoryMock.Object, _mapper);
    }

    [Fact]
    public async Task GetAllSongsForTable_ReturnsListOfSongForTableDtos_WhenExists()
    {
        // Arrange
        var songList = new List<Song>
        {
            new()
            {
                Id = 1,
                Title = "Song 1",
                Created = new DateTime(2023, 11, 2),
                LastScheduled = new DateTime(2023, 11, 2)
            },
            new()
            {
                Id = 2,
                Title = "Song 2",
                Created = new DateTime(2023, 11, 2),
                LastScheduled = new DateTime(2023, 11, 2)
            },
            new()
            {
                Id = 3,
                Title = "Song 3",
                Created = new DateTime(2023, 11, 2),
                LastScheduled = new DateTime(2023, 11, 2)
            },
            new()
            {
                Id = 4,
                Title = "Song 4",
                Created = new DateTime(2023, 11, 2),
                LastScheduled = new DateTime(2023, 11, 2)
            }
        };
        _songRepositoryMock.Setup(s => s.GetAllSongsAsync()).ReturnsAsync(songList);

        // Act
        var result = await _service.GetAllSongsForTableAsync();

        // Assert
        _songRepositoryMock.Verify(s => s.GetAllSongsAsync(), Times.Once);
        Assert.NotEmpty(result);
        Assert.IsType<List<SongForTableDto>>(result);

        for (var i = 0; i < songList.Count; i++)
        {
            var mappedObject = _mapper.Map<SongForTableDto>(songList[i]);
            Assert.Equal(mappedObject.Id, result[i].Id);
            Assert.Equal(mappedObject.Title, result[i].Title);
            Assert.Equal(mappedObject.Created, result[i].Created);
            Assert.Equal(mappedObject.LastScheduled, result[i].LastScheduled);
        }
    }

    [Fact]
    public async Task GetAllSongsForTable_ReturnsEmptyList_WhenDoesNotExists()
    {
        // Arrange
        _songRepositoryMock.Setup(s => s.GetAllSongsAsync()).ReturnsAsync(new List<Song>());

        // Act
        var result = await _service.GetAllSongsForTableAsync();

        // Assert
        _songRepositoryMock.Verify(s => s.GetAllSongsAsync(), Times.Once);
        Assert.Empty(result);
    }

    [Fact]
    public async Task CreateSongAsync_ReturnsCorrectType_WhenSuccess()
    {
        // Arrange
        var song = new CreateSongDto { Title = "Song 1" };
        _songRepositoryMock.Setup(s => s.CreateSongAsync(It.IsAny<Song>())).ReturnsAsync(new Song
        {
            Id = 1,
            Title = song.Title
        });

        // Act
        var result = await _service.CreateSongAsync(song);

        // Assert
        Assert.NotNull(result);
        _songRepositoryMock.Verify(s => s.CreateSongAsync(It.IsAny<Song>()), Times.Once);
        Assert.Equal(song.Title, result.Title);
    }

    [Fact]
    public async Task DeleteSongAsync_ThrowsKeyNotFoundException_WhenNotFound()
    {
        // Arrange
        const int id = 1;
        _songRepositoryMock.Setup(s => s.DeleteSongAsync(id)).ThrowsAsync(new KeyNotFoundException());

        // Act

        // Assert
        await Assert.ThrowsAsync<KeyNotFoundException>(() => _service.DeleteSongAsync(id));
    }
}