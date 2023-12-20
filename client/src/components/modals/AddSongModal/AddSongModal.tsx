import {useEffect} from 'react';
import Modal from "../Modal.tsx";
import {AddSongModalFormValues, AddSongModalProps} from "./AddSongModal.interfaces.ts";
import styles from "./AddSongModal.module.css";
import {useForm} from "react-hook-form";
import {CreateSongDto} from "../../../models/CreateSongDto.ts";
import TextInput from "../../forms/TextInput/TextInput.tsx";

export default function AddSongModal(props: AddSongModalProps) {
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors}
    } = useForm<AddSongModalFormValues>({
        defaultValues: {
            title: '',
            composer: undefined,
            bpm: undefined
        }
    });

    useEffect(() => {
        reset();
    }, [props.isOpen, reset])

    const handleCancel = () => {
        props.onCancel();
    }

    const submitHandler = async (data: AddSongModalFormValues) => {
        const dto: CreateSongDto = {
            title: data.title!,
            composer: data.composer,
            bpm: data.bpm
        };

        console.log(dto);

        const response = await fetch(`${import.meta.env.VITE_PUBLIC_API_URL}/song`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dto)
        });

        if (response.ok) {
            const createdSong = await response.json();
            props.onAddSong(createdSong);
        }
    }

    return (
        <Modal header="Add Song" isOpen={props.isOpen} onCancel={handleCancel}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <TextInput id="titleInput"
                           name="title"
                           register={register}
                           registerOptions={{
                               required: 'Required', maxLength: {
                                   value: 30,
                                   message: 'Cannot be longer than 30 characters'
                               }
                           }}>Title *</TextInput>
                <br/>
                <span className="text-red-500 text-xs">{errors.title?.message}</span>
                <br/>
                <TextInput id="composerInput"
                           name="composer"
                           register={register}
                           registerOptions={{
                               maxLength: {
                                   value: 100,
                                   message: 'Cannot be longer than 100 characters'
                               },
                               setValueAs: value => value === '' ? undefined : value
                           }}>Composer</TextInput>
                <br/>
                <span className="text-red-500 text-xs">{errors.composer?.message}</span>
                <br/>
                <div className="mb-4">
                    <label htmlFor="bpmInput" className="text-xs text-zinc-600">How fast is this song?</label>
                    <br/>
                    <div className="relative inline-block">
                        <input type="number"
                               id="bpmInput"
                               {...register("bpm", {
                                   min: {
                                       value: 0,
                                       message: 'Must be 0 - 999'
                                   },
                                   max: {
                                       value: 999,
                                       message: 'Must be 0 - 999'
                                   },
                                   setValueAs: value => value === '' ? undefined : Number(value)
                               })}
                               className={`${styles['numberInput']} p-2 pr-14 w-32 bg-zinc-50 border border-zinc-300 rounded focus:outline-none`}/>
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600">BPM</span>
                    </div>
                    <br/>
                    <span className="text-red-500 text-xs">{errors.bpm?.message}</span>
                </div>
                <div className="mt-16 flex flex-row gap-2 justify-end">
                    <button type="button" className="bg-zinc-500 text-white p-3 rounded w-32"
                            onClick={handleCancel}>Cancel
                    </button>
                    <button className="bg-blue-500 text-white p-3 rounded w-32">Submit</button>
                </div>
            </form>
        </Modal>
    );
}
