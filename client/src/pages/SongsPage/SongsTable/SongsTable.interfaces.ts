import SongForTableDto from "../../../models/SongForTableDto.ts";

export interface SongsTableProps {
    songs: SongForTableDto[],
    onDeleteSong: (id: number) => void
}
