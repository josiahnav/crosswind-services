using CrosswindServices.Api.Controllers;
using CrosswindServices.Services.Interfaces;
using CrosswindServices.Shared.Dtos.Songs;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using System.ComponentModel.DataAnnotations;
using Moq;
using System.ComponentModel.DataAnnotations;
using System.Xml.XPath;

namespace CrosswindServices.Api.Tests;

public class SongControllerTests
{
    private readonly Mock<ISongService> _songsServiceMock;
    private readonly SongController _controller;

    public SongControllerTests()
    {
        _songsServiceMock = new Mock<ISongService>();
        _controller = new SongController(_songsServiceMock.Object, new NullLogger<SongController>());
    }

    [Fact]
    public async Task GetAll_ReturnsListOfSongs_WhenExists()
    {
        // Arrange
        var songForTableDtos = new List<SongForTableDto>
        {
            new()
            {
                Id = 1,
                Title = "Song 1",
                Created = new DateTime(2023, 10, 29),
                LastScheduled = new DateTime(2023, 10, 29)
            },
            new()
            {
                Id = 2,
                Title = "Song 2",
                Created = new DateTime(2023, 10, 29),
                LastScheduled = new DateTime(2023, 10, 29)
            },
            new()
            {
                Id = 3,
                Title = "Song 3",
                Created = new DateTime(2023, 10, 29),
                LastScheduled = new DateTime(2023, 10, 29)
            }
        };
        _songsServiceMock.Setup(s => s.GetAllSongsForTableAsync()).ReturnsAsync(songForTableDtos);

        // Act
        var result = await _controller.GetAll();

        // Assert
        // - Return types 
        Assert.NotNull(result);
        var okObjectResult = result.Result as OkObjectResult;
        Assert.NotNull(okObjectResult);
        var returnValue = Assert.IsType<List<SongForTableDto>>(okObjectResult.Value);

        // - Return value
        Assert.Equal(songForTableDtos.Count, returnValue.Count);
        Assert.Equal(songForTableDtos, returnValue);

        // - Proper method call
        _songsServiceMock.Verify(s => s.GetAllSongsForTableAsync(), Times.Once);
    }

    [Fact]
    public async Task GetAll_ReturnsEmptyList_WhenDoesNotExist()
    {
        // Arrange
        var songForTableDtos = new List<SongForTableDto>();
        _songsServiceMock.Setup(s => s.GetAllSongsForTableAsync()).ReturnsAsync(songForTableDtos);

        // Act
        var result = await _controller.GetAll();

        // Assert
        // - Return types 
        Assert.NotNull(result);
        var okObjectResult = result.Result as OkObjectResult;
        Assert.NotNull(okObjectResult);
        var returnValue = Assert.IsType<List<SongForTableDto>>(okObjectResult.Value);

        // - Return value
        Assert.Empty(returnValue);

        // - Proper method call
        _songsServiceMock.Verify(s => s.GetAllSongsForTableAsync(), Times.Once);
    }

    [Fact]
    public async Task Get_ReturnsCorrectType_WhenExists()
    {
        // Arrange
        var song = new SongForTableDto
            { Id = 1, Title = "Song 1", Created = new DateTime(), LastScheduled = new DateTime() };
        _songsServiceMock.Setup(s => s.GetSongForTableAsync(1)).ReturnsAsync(song);

        // Act
        var result = await _controller.Get(1);

        // Assert
        Assert.NotNull(result);
        var okObjectResult = result.Result as OkObjectResult;
        Assert.NotNull(okObjectResult);
        Assert.Equal(song, okObjectResult.Value);
        Assert.IsType<SongForTableDto>(okObjectResult.Value);
    }

    [Fact]
    public async Task Get_ReturnsNotFound_WhenDoesNotExist()
    {
        // Arrange
        _songsServiceMock.Setup(s => s.GetSongForTableAsync(It.IsAny<int>())).ReturnsAsync((SongForTableDto?)null);

        // Act
        var result = await _controller.Get(1);

        // Assert
        Assert.NotNull(result);
        var notFoundObject = result.Result as NotFoundResult;
        Assert.NotNull(notFoundObject);
    }

    [Fact]
    public async Task Post_ReturnsCreatedAtRouteResult_WhenSuccess()
    {
        // Arrange
        var song = new CreateSongDto { Title = "Song 1" };
        _songsServiceMock.Setup(s => s.CreateSongAsync(It.IsAny<CreateSongDto>())).ReturnsAsync(new SongForTableDto
        {
            Id = 1,
            Title = song.Title,
            Created = DateTime.UtcNow,
        });

        // Act
        var result = await _controller.Post(song);

        // Assert
        Assert.NotNull(result);
        var createdAtRouteResult = result.Result as CreatedAtRouteResult;
        Assert.NotNull(createdAtRouteResult);
    }

    [Fact]
    public async Task Post_ReturnsBadRequest_WhenDtoInvalid()
    {
        // Arrange
        var songTitleIsEmpty = new CreateSongDto { Title = "" };
        var songTitleIsEmptyValidationContext =
            new ValidationContext(songTitleIsEmpty, serviceProvider: null, items: null);
        var songTitleIsEmptyValidationResults = new List<ValidationResult>();
        
        var songTitleIsLong = new CreateSongDto
            { Title = new string('1', 31) };
        var songTitleIsLongValidationContext = new ValidationContext(songTitleIsLong, serviceProvider: null, items: null);
        var songTitleIsLongValidationResults = new List<ValidationResult>();
        
        // Act
        var songTitleIsEmptyIsValid = Validator.TryValidateObject(songTitleIsEmpty, songTitleIsEmptyValidationContext,
            songTitleIsEmptyValidationResults, true);
        foreach (var result in songTitleIsEmptyValidationResults.Where(result => result.ErrorMessage != null))
        {
            _controller.ModelState.AddModelError(result.MemberNames.First(), result.ErrorMessage!);
        }
        
        var songTitleIsLongIsValid = Validator.TryValidateObject(songTitleIsLong, songTitleIsLongValidationContext, songTitleIsLongValidationResults, true);
        foreach (var result in songTitleIsLongValidationResults.Where(result => result.ErrorMessage != null))
        {
            _controller.ModelState.AddModelError(result.MemberNames.First(), result.ErrorMessage!);
        }
        
        var emptyTitleResult = await _controller.Post(songTitleIsEmpty);
        var longTitleResult = await _controller.Post(songTitleIsLong);

        // Assert
        Assert.False(songTitleIsEmptyIsValid);
        Assert.False(songTitleIsLongIsValid);
        
        Assert.NotNull(emptyTitleResult);
        var emptyTitleBadRequestObjectResult = emptyTitleResult.Result as BadRequestObjectResult;
        Assert.NotNull(emptyTitleBadRequestObjectResult);
        
        Assert.NotNull(longTitleResult);
        var longTitleBadRequestObjectResult = longTitleResult.Result as BadRequestObjectResult;
        Assert.NotNull(longTitleBadRequestObjectResult);
    }

    [Fact]
    public async Task Delete_ReturnsNoContentResult_Success()
    {
        // Arrange
        const int id = 1;

        // Act
        var result = await _controller.Delete(1);

        // Assert
        Assert.NotNull(result);
        var noContentResult = result as NoContentResult;
        Assert.NotNull(noContentResult);
    }

    [Fact]
    public async Task Delete_ReturnsNotFoundObjectResult_WhenNotFound()
    {
        // Arrange
        const int id = 1;
        _songsServiceMock.Setup(s => s.DeleteSongAsync(id)).ThrowsAsync(new KeyNotFoundException());

        // Act
        var result = await _controller.Delete(id);

        // Assert
        Assert.NotNull(result);
        var notFoundResult = result as NotFoundObjectResult;
        Assert.NotNull(notFoundResult);
    }

    [Fact]
    public async Task Delete_ReturnsBadRequestObjectResult_WhenUnknownFailure()
    {
        // Arrange
        const int id = 1;
        _songsServiceMock.Setup(s => s.DeleteSongAsync(id)).ThrowsAsync(new Exception());

        // Act
        var result = await _controller.Delete(id);

        // Assert
        Assert.NotNull(result);
        var badRequestObjectResult = result as BadRequestObjectResult;
        Assert.NotNull(badRequestObjectResult);
    }
}