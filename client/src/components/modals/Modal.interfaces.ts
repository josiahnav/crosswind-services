import {ReactNode} from "react";

export interface ModalProps {
    children: ReactNode,
    header: string,
    isOpen: boolean,
    onCancel: () => void
}
