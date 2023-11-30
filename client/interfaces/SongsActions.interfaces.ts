import SongForTableDto from "@/models/songs/SongForTableDto";

export interface SongsActionsProps {
    songs: SongForTableDto[],
    onAddSong: (createdSong: SongForTableDto) => void
}
