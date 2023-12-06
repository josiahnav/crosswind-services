using AutoMapper;
using CrosswindServices.Data.Entities;
using CrosswindServices.Repository;
using CrosswindServices.Repository.Interfaces;
using CrosswindServices.Services.Interfaces;
using CrosswindServices.Shared.Dtos.Songs;

namespace CrosswindServices.Services;

public class SongService : ISongService
{
    private readonly ISongRepository _songRepository;
    private readonly IMapper _mapper;

    public SongService(ISongRepository songRepository, IMapper mapper)
    {
        _songRepository = songRepository;
        _mapper = mapper;
    }
    
    public async Task<List<SongForTableDto>> GetAllSongsForTableAsync()
    {
        var result = await _songRepository.GetAllSongsAsync();
        return result.Select(s => _mapper.Map<SongForTableDto>(s)).ToList();
    }

    public async Task<SongForTableDto?> GetSongForTableAsync(int id)
    {
        var result = await _songRepository.GetSongAsync(id);
        return _mapper.Map<SongForTableDto>(result);
    }

    public async Task<SongForTableDto> CreateSongAsync(CreateSongDto createSongDto)
    {
        var result = await _songRepository.CreateSongAsync(_mapper.Map<Song>(createSongDto));
        return _mapper.Map<SongForTableDto>(result);
    }

    public async Task DeleteSongAsync(int id)
    {
        try
        {
            await _songRepository.DeleteSongAsync(id);
        }
        catch (KeyNotFoundException)
        {
            throw new KeyNotFoundException($"Song id {id} does not exist");
        }
    }
}