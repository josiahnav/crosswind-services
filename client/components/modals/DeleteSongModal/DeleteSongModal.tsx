import React, {forwardRef} from 'react';
import Modal from "@/components/modals/Modal";
import {DeleteSongModalProps} from "@/interfaces/DeleteSongModalProps";

const DeleteSongModal = forwardRef<HTMLDialogElement, DeleteSongModalProps>(function DeleteSongModal(props, ref){
    return (
        <Modal ref={ref} header="Delete Song" onClick={props.onClick}>
            <p>Are you sure you want to delete <b>{props.title}</b>?</p>
        </Modal>
    );
});

export default DeleteSongModal;
