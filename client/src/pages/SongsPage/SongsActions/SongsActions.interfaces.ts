import SongForTableDto from "../../../models/SongForTableDto.ts";

export interface SongsActionsProps {
    songs: SongForTableDto[],
    onAddSong: (createdSong: SongForTableDto) => void
}
