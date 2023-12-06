import React from "react";

export interface DeleteSongModalProps {
    onClick: (event: React.MouseEvent<HTMLDialogElement>) => void,
    onCancelClick: () => void,
    onDeleteSong: () => void,
    title: string
}
