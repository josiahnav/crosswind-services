import React from 'react';

import styles from "./styles.module.css";
import {SongsTableProps} from "@/interfaces/SongsTable.interfaces";

export default function SongsTable(props: SongsTableProps) {
    const formatDate = (date: Date): string => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    return (
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
            </tr>
            </thead>
            <tbody>
            {
                props.songs.map(s => {
                    return (
                        <tr key={s.id}>
                            <td className="py-1.5 pl-2.5 border-t border-t-blue-300">{s.title}</td>
                            <td className="py-1.5 border-t border-t-blue-300 text-neutral-500">130</td>
                            <td className="py-1.5 border-t border-t-blue-300 text-neutral-500">{formatDate(new Date(s.created))}</td>
                            <td className="py-1.5 border-t border-t-blue-300 text-neutral-500">{formatDate(new Date(s.lastScheduled))}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    );
};
