import SongForTableDto from "../../../models/SongForTableDto.ts";

export interface AddSongModalProps {
    isOpen: boolean,
    onAddSong: (song: SongForTableDto) => void,
    onCancel: () => void
}

export interface AddSongModalFormValues {
    title: string,
    composer?: string,
    bpm?: number
}
