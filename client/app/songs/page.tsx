import React from 'react';
import {Metadata} from "next";
import SongForTableDto from "@/models/songs/SongForTableDto";
import SongTable from "@/app/songs/song-table/song-table";
import ActionButton from "@/app/songs/action-button/action-button";

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
            <div className="flex flex-row gap-6 mb-10">
                <ActionButton title="Add" subtitle="a new worship song"></ActionButton>
                <ActionButton title="Schedule" subtitle="a Sunday worship song"></ActionButton>
            </div>
            <SongTable songs={data}></SongTable>
        </div>
    );
};
