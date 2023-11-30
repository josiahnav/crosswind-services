'use client'

import React, {useCallback, useEffect, useState} from 'react';
import SongForTableDto from "@/models/songs/SongForTableDto";
import SongsTable from "@/app/songs/SongsTable/SongsTable";
import SongsActions from "@/app/songs/SongsActions/SongsActions";

export default function SongsPage() {

    const [songs, setSongs] = useState<SongForTableDto[]>([]);
    const [isLoadingSongs, setIsLoadingSongs] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        const getSongs = async () => {
            setIsLoadingSongs(true);
            const response = await fetch('http://localhost:5186/api/song');
            if(response.ok) {
                const songs = await response.json();
                setSongs(songs);
            }
            setIsLoadingSongs(false);
        }
        // noinspection JSIgnoredPromiseFromCall
        getSongs();
    }, []);

    const handleAddSong = useCallback((createdSong: SongForTableDto) => {
        setSongs(prevState => [...prevState, createdSong]);
    }, [])

    return (
        <div>
            <h2 className="text-2xl mb-6">What would you like to do...?</h2>
            <SongsActions songs={songs} onAddSong={handleAddSong}></SongsActions>
            {!isLoadingSongs && <SongsTable songs={songs}></SongsTable>}
        </div>
    );
};
