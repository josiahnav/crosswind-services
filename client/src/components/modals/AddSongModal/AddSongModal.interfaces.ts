import React from "react";
import SongForTableDto from "../../../models/SongForTableDto.ts";

export interface AddSongModalProps {
    onClick: (event: React.MouseEvent<HTMLDialogElement>) => void,
    onCancelClick: () => void,
    onAddSong: (song: SongForTableDto) => void
}
