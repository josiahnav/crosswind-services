import React, {ReactNode} from "react";

export interface ModalProps {
    children: ReactNode,
    header: string,
    onClick: (event: React.MouseEvent<HTMLDialogElement>) => void
}
