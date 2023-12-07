import React, {ReactNode} from "react";

export interface ModalProps {
    children: ReactNode,
    header: string,
    onClick: (event: React.MouseEvent<HTMLDialogElement>) => void,
    onClose: (event: React.SyntheticEvent<HTMLDialogElement>) => void,
    onCancel: (event: React.SyntheticEvent<HTMLDialogElement>) => void
}
