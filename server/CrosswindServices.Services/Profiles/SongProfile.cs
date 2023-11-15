using AutoMapper;
using CrosswindServices.Data.Entities;
using CrosswindServices.Shared.Dtos.Songs;

namespace CrosswindServices.Services.Profiles;

public class SongProfile : Profile
{
    public SongProfile()
    {
        CreateMap<Song, SongForTableDto>().ReverseMap();
        CreateMap<Song, CreateSongDto>().ReverseMap();
    }
}