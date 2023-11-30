import React from 'react';

export default function SongsLayout({children}: {children: React.ReactNode}) {
    return (
        <section className="flex flex-col self-start items-center">{children}</section>
    );
};
