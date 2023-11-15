import React from 'react';
import {Metadata} from "next";
import SongForTableDto from "@/models/songs/SongForTableDto";
import SongTable from "@/app/songs/song-table";


export const metadata: Metadata = {
    title: 'Songs'
};

async function getData(): Promise<SongForTableDto[]> {
    const res = await fetch('http://localhost:5186/api/song', { next: { revalidate: 2 }});
    return await res.json();
}

export default async function SongsPage() {
    const data = await getData();
    return (
        <div>
            <h2 className="text-2xl">What would you like to do...?</h2>
            <SongTable songs={data}></SongTable>
        </div>
    );
};
