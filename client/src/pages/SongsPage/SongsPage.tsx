import {useCallback, useEffect, useState} from 'react';
import SongForTableDto from "../../models/SongForTableDto.ts";
import SongsTable from "./SongsTable/SongsTable.tsx";
import SongsActions from "./SongsActions/SongsActions.tsx";

export default function SongsPage() {

    const [songs, setSongs] = useState<SongForTableDto[]>([]);
    const [isLoadingSongs, setIsLoadingSongs] = useState<boolean>(true);
    // const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        const getSongs = async () => {
            setIsLoadingSongs(true);
            const response = await fetch(`${import.meta.env.VITE_PUBLIC_API_URL}/song`)
            if (response.ok) {
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
        <div className="flex flex-col self-start items-center">
            {!isLoadingSongs ? <div>
                <h2 className="text-2xl mb-6">What would you like to do...?</h2>
                <SongsActions songs={songs} onAddSong={handleAddSong}></SongsActions>
                {songs.length ? <SongsTable songs={songs}></SongsTable> : <h2>No existing songs. Please add a song to
                continue.</h2>}
            </div> : <h2 className="text-2xl text-zinc-400">Loading songs...</h2>}
        </div>
    );
};
