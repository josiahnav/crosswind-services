import React from 'react';

export default function ActionButton(props: { title: string, subtitle: string }) {
    return (
        <div
            className="transition border border-blue-500 rounded w-56 py-6 pl-5 cursor-pointer
                hover:bg-blue-300 hover:border-blue-300">
            <div className="font-bold text-3xl">{props.title}</div>
            <div>{props.subtitle}</div>
        </div>
    );
};
