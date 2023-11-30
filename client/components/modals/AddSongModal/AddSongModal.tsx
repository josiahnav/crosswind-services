'use client'

import React, {forwardRef, useState} from 'react';
import Modal from "@/components/modals/Modal";
import {AddSongModalProps} from "@/interfaces/AddSongModal.interfaces";
import styles from "./AddSongModal.module.css";

const AddSongModal = forwardRef<HTMLDialogElement, AddSongModalProps>(function AddSongModal(props, ref) {

    const [formValues, setFormValues] = useState({
        title: "",
        composer: "",
        bpm: ""
    });
    const maxBpm = 999;
    const [didEdit, setDidEdit] = useState({
        title: false,
        composer: false,
        bpm: false
    });
    const titleIsInvalid = didEdit.title && formValues.title.length == 0;

    const handleInputChange = (identifier: string, value: any) => {
        // Ensures that the user cannot enter a BPM greater than 999
        if (identifier == "bpm") {
            value = Number(value) <= maxBpm ? value : maxBpm.toString()
        }

        setFormValues(prevState => ({
            ...prevState,
            [identifier]: value
        }));

        setDidEdit(prevState => ({
            ...prevState,
            [identifier]: false
        }));
    }

    const handleInputBlur = (identifier: string) => {
        setDidEdit(prevState => ({
            ...prevState,
            [identifier]: true
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const formEntries = Object.fromEntries(formData.entries());

        if (formEntries.title.toString().length == 0) {
            setDidEdit(prevState => ({
                ...prevState,
                title: true
            }));
            return;
        }

        let response = await fetch('http://localhost:5186/api/song', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formEntries)
        });

        if(response.ok) {
            const createdSong = await response.json();
            props.onAddSong(createdSong);
        }
    };

    return (
        <Modal ref={ref} header="Add Song" onClick={props.onClick}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="titleInput" className="text-xs text-zinc-600">Title *</label>
                    <br/>
                    <input type="text"
                           id="titleInput"
                           name="title"
                           className="p-2 w-96 bg-zinc-50 border border-zinc-300 rounded focus:outline-none"
                           value={formValues.title}
                           onBlur={() => handleInputBlur("title")}
                           onChange={(event) => handleInputChange("title", event.target.value)}/>
                    <br/>
                    {titleIsInvalid && <span className="text-red-500 text-xs">Please enter a title.</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="composerInput" className="text-xs text-zinc-600">Composer</label>
                    <br/>
                    <input type="text"
                           id="composerInput"
                           name="composer"
                           className="p-2 w-96 bg-zinc-50 border border-zinc-300 rounded focus:outline-none"
                           value={formValues.composer}
                           onBlur={() => handleInputBlur("composer")}
                           onChange={(event) => handleInputChange("composer", event.target.value)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="bpmInput" className="text-xs text-zinc-600">How fast is this song?</label>
                    <br/>
                    <div className="relative inline-block">
                        <input type="number"
                               max={maxBpm}
                               id="bpmInput"
                               name="bpm"
                               value={formValues.bpm}
                               onChange={(event) => handleInputChange("bpm", event.target.value)}
                               onBlur={() => handleInputBlur("bpm")}
                               className={`${styles['numberInput']} p-2 pr-14 w-32 bg-zinc-50 border border-zinc-300 rounded focus:outline-none`}/>
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600">BPM</span>
                    </div>
                </div>
                <div className="mt-16 flex flex-row gap-2 justify-end">
                    <button type="button" className="bg-zinc-500 text-white p-3 rounded w-32"
                            onClick={props.onCancelClick}>Cancel
                    </button>
                    <button className="bg-blue-500 text-white p-3 rounded w-32">Submit</button>
                </div>
            </form>
        </Modal>
    );
});

export default AddSongModal;
