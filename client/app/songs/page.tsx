import React from 'react';
import {Metadata} from "next";
import SongForTableDto from "@/models/songs/SongForTableDto";
import SongsTable from "@/app/songs/SongsTable/SongsTable";
import SongsActions from "@/app/songs/SongsActions/SongsActions";

export const metadata: Metadata = {
    title: 'Songs'
};

async function getData(): Promise<SongForTableDto[]> {
    const res = await fetch('http://localhost:5186/api/song', {next: {revalidate: 2}});
    return await res.json();
}

export default async function SongsPage() {
    const data = await getData();

    return (
        <div>
            <h2 className="text-2xl mb-6">What would you like to do...?</h2>
            <SongsActions></SongsActions>
            <SongsTable songs={data}></SongsTable>
        </div>
    );
};
