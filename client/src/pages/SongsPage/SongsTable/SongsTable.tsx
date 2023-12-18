import {useCallback, useState} from 'react';
import styles from "./styles.module.css";
import {SongsTableProps} from "./SongsTable.interfaces.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import DeleteSongModal from "../../../components/modals/DeleteSongModal/DeleteSongModal.tsx";
import {useNavigate} from "react-router-dom";

export default function SongsTable(props: SongsTableProps) {

    const [selectedId, setSelectedId] = useState<number>();
    const [selectedTitle, setSelectedTitle] = useState<string>('');
    const [deleteSongIsOpen, setDeleteSongIsOpen] = useState(false);

    const navigate = useNavigate();

    const formatDate = (date: Date): string => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    const handleSongTitleClick = (songId: number) => {
        navigate(`/songs/edit/${songId}`);
    };

    const handleTrashIconClick = (index: number) => {
        setSelectedId(props.songs[index].id);
        setSelectedTitle(props.songs[index].title);
        setDeleteSongIsOpen(true);
    }

    const handleDeleteSong = useCallback(async () => {
        if (!selectedId) {
            console.log('No song selected');
            return;
        }

        const url = `${import.meta.env.VITE_PUBLIC_API_URL}/song/${selectedId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {}
        });

        if (!response.ok) {
            console.log(`Failed to delete ${selectedTitle}`);
            return;
        }

        setDeleteSongIsOpen(false)
        props.onDeleteSong(selectedId!);
    }, [props, selectedId, selectedTitle])

    const handleDeleteSongCancel = () => {
        setDeleteSongIsOpen(false);
    };

    return (
        <>
            <DeleteSongModal isOpen={deleteSongIsOpen}
                             onCancel={handleDeleteSongCancel}
                             onDeleteSong={handleDeleteSong}
                             title={selectedTitle}></DeleteSongModal>
            <table className={`border-separate border-spacing-0 border border-blue-300 rounded`}>
                <colgroup>
                    <col className={styles['title-column']}/>
                    <col className={styles['bpm-column']}/>
                    <col className={styles['created-column']}/>
                    <col className={styles['last-scheduled-column']}/>
                </colgroup>
                <thead>
                <tr className={`text-white bg-blue-500 text-left`}>
                    <th scope="col" className="py-1.5 pl-2.5 font-medium">Title</th>
                    <th scope="col" className="py-1.5 font-medium">BPM</th>
                    <th scope="col" className="py-1.5 font-medium">Created</th>
                    <th scope="col" className="py-1.5 font-medium">Last Scheduled</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {
                    props.songs.map((s, index) => {
                        return (
                            <tr key={s.id}>
                                <td className="py-1.5 pl-2.5 border-t border-t-blue-300 cursor-pointer"
                                    onClick={() => handleSongTitleClick(s.id)}>{s.title}</td>
                                <td className="py-1.5 border-t border-t-blue-300 text-neutral-500">{s.bpm || '-'}</td>
                                <td className="py-1.5 border-t border-t-blue-300 text-neutral-500">
                                    {formatDate(new Date(s.created))}
                                </td>
                                <td className="py-1.5 border-t border-t-blue-300 text-neutral-500">
                                    {s.lastScheduled ? formatDate(new Date(s.lastScheduled)) : '-'}
                                </td>
                                <td className="py-1.5 pr-2.5 border-t border-t-blue-300 text-neutral-500 cursor-pointer">
                                    <button onClick={() => handleTrashIconClick(index)}
                                            aria-label={`Delete song titled ${s.title}`}>
                                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </>
    );
}
