import {SyntheticEvent, useEffect, useRef} from 'react';
import styles from './Modal.module.css';
import {ModalProps} from "./Modal.interfaces.ts";

export default function Modal(props: ModalProps) {

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (props.isOpen) {
            dialogRef.current?.showModal();
            return;
        }
        dialogRef.current?.close();
    }, [props.isOpen]);

    const handleBackdropClick = (event: SyntheticEvent) => {
        if (checkIfBackdropClick(event)) {
            props.onCancel();
        }
    };

    const checkIfBackdropClick = (event: SyntheticEvent) => {
        return event.currentTarget.tagName === 'DIALOG' && event.target === event.currentTarget;
    }

    const handleCancel = (event: SyntheticEvent) => {
        event.preventDefault();
        props.onCancel();
    };

    return (
        <dialog ref={dialogRef} className={`${styles['modal']} rounded`}
                onClick={handleBackdropClick} onCancel={handleCancel}>
            <div className="p-5">
                <h1 className="text-xl mb-4">{props.header}</h1>
                {props.children}
            </div>
        </dialog>
    );
}
