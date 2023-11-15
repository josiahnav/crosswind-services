using CrosswindServices.Services.Interfaces;
using CrosswindServices.Shared.Dtos.Songs;
using Microsoft.AspNetCore.Mvc;

namespace CrosswindServices.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SongController : Controller
{
    private readonly ISongService _songService;
    private readonly ILogger<SongController> _logger;
    
    public SongController(ISongService songService, ILogger<SongController> logger)
    {
        _songService = songService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SongForTableDto>>> GetAll()
    {
        try
        {
            var result = await _songService.GetAllSongsForTableAsync();
            return Ok(result);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An unknown error has occurred while getting the songs for the table");
            return StatusCode(500, "An unknown error has occurred");
        }
    }

    [HttpGet("{id:int}", Name = "Get")]
    public async Task<ActionResult<SongForTableDto>> Get(int id)
    {
        try
        {
            var result = await _songService.GetSongForTableAsync(id);

            if (result == null)
            {
                return NotFound();
            }
            
            return Ok(result);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An unknown error has occurred while getting the song");
            return StatusCode(500, "An unknown error has occurred");
        }
    }

    [HttpPost]
    public async Task<ActionResult<SongForTableDto>> Post([FromBody] CreateSongDto createSongDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _songService.CreateSongAsync(createSongDto);
            return CreatedAtRoute(nameof(Get), new { id = result.Id }, result);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An unknown error has occurred while attempting to create the new song");
            return StatusCode(500, "An unknown error has occurred");
        }
    }
}