import {forwardRef} from 'react';
import Modal from "../Modal.tsx";
import {DeleteSongModalProps} from "./DeleteSongModalProps.ts";

const DeleteSongModal = forwardRef<HTMLDialogElement, DeleteSongModalProps>(function DeleteSongModal(props, ref){
    return (
        <Modal ref={ref} header="Delete Song" onClick={props.onClick}>
            <p>Are you sure you want to delete <b>{props.title}</b>?</p>
            <p>This action cannot be undone.</p>
            <div className="mt-16 flex flex-row gap-2 justify-end">
                <button type="button" className="bg-zinc-500 text-white p-3 rounded w-32"
                        onClick={props.onCancelClick}>Cancel
                </button>
                <button className="bg-blue-500 text-white p-3 rounded w-32">Delete</button>
            </div>
        </Modal>
    );
});

export default DeleteSongModal;
