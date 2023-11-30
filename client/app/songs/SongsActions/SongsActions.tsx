'use client'

import React, {useCallback, useRef} from 'react';
import ActionButton from "@/app/songs/ActionButton/ActionButton";
import AddSongModal from "@/components/modals/AddSongModal/AddSongModal";
import SongForTableDto from "@/models/songs/SongForTableDto";
import {SongsActionsProps} from "@/interfaces/SongsActions.interfaces";

export default function SongsActions(props: SongsActionsProps) {
    const addSongDialogRef = useRef<HTMLDialogElement>(null);

    const handleAddClick = useCallback(() => {
        addSongDialogRef.current?.showModal();
    }, []);

    const handleAddDialogClick = useCallback((event: any) => {
        if (event.target == addSongDialogRef.current) {
            addSongDialogRef.current?.close();
        }
    }, []);

    const handleAddSongModalCancelClick = useCallback(() => {
        addSongDialogRef.current?.close();
    }, []);

    const handleAddSong = useCallback((createdSong: SongForTableDto) => {
        addSongDialogRef.current?.close();
        props.onAddSong(createdSong);
    }, [props]);

    const handleScheduleClick = useCallback(() => {
        console.log('Schedule');
    }, []);

    return (
        <div className="flex flex-row gap-6 mb-10 mx-auto">
            <AddSongModal ref={addSongDialogRef}
                          onClick={handleAddDialogClick}
                          onCancelClick={handleAddSongModalCancelClick}
                          onAddSong={handleAddSong}></AddSongModal>
            <ActionButton title="Add" subtitle="a new worship song" onClick={handleAddClick}></ActionButton>
            <ActionButton title="Schedule" subtitle="a Sunday worship song"
                          onClick={handleScheduleClick}></ActionButton>
        </div>
    );
};
