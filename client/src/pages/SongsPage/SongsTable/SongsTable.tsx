import {useCallback, useRef, useState} from 'react';
import styles from "./styles.module.css";
import {SongsTableProps} from "./SongsTable.interfaces.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import DeleteSongModal from "../../../components/modals/DeleteSongModal/DeleteSongModal.tsx";

export default function SongsTable(props: SongsTableProps) {
    const [selectedId, setSelectedId] = useState<number>();
    const [selectedTitle, setSelectedTitle] = useState<string>('');

    const deleteSongDialogRef = useRef<HTMLDialogElement>(null);

    const formatDate = (date: Date): string => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    const handleDeleteClick = (index: number) => {
        setSelectedId(props.songs[index].id);
        setSelectedTitle(props.songs[index].title);
        deleteSongDialogRef.current?.showModal();
    }

    const handleDeleteDialogClick = useCallback((event: any) => {
        if(event.target == deleteSongDialogRef.current) {
            deleteSongDialogRef.current?.close();
        }
    }, []);

    const handleDeleteCancelClick = useCallback(() => {
        deleteSongDialogRef.current?.close();
    }, []);

    const handleDeleteSong = useCallback((id: number) => {

    }, [])

    return (
        <>
            <DeleteSongModal ref={deleteSongDialogRef}
                             onClick={handleDeleteDialogClick}
                             onCancelClick={handleDeleteCancelClick}
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
                                <td className="py-1.5 pl-2.5 border-t border-t-blue-300">{s.title}</td>
                                <td className="py-1.5 border-t border-t-blue-300 text-neutral-500">{s.bpm || '-'}</td>
                                <td className="py-1.5 border-t border-t-blue-300 text-neutral-500">
                                    {formatDate(new Date(s.created))}
                                </td>
                                <td className="py-1.5 border-t border-t-blue-300 text-neutral-500">
                                    {s.lastScheduled ? formatDate(new Date(s.lastScheduled)) : '-'}
                                </td>
                                <td className="py-1.5 pr-2.5 border-t border-t-blue-300 text-neutral-500 cursor-pointer">
                                    <button onClick={() => handleDeleteClick(index)}
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
};
