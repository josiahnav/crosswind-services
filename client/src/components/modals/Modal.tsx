import {forwardRef} from 'react';
import styles from './Modal.module.css';
import {ModalProps} from "./Modal.interfaces.ts";

const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(props, ref) {
    return (
        <dialog ref={ref} className={`${styles['modal']} rounded`} onClick={props.onClick}
                onClose={props.onClose} onCancel={props.onCancel}>
            <div className="p-5">
                <h1 className="text-xl mb-4">{props.header}</h1>
                {props.children}
            </div>
        </dialog>
    );
});

export default Modal;
