import {FieldValues, RegisterOptions, UseFormRegister} from "react-hook-form";
import {ReactNode} from "react";

export interface TextInputProps {
    children: ReactNode,
    id: string,
    name: string,
    register: UseFormRegister<FieldValues>,
    registerOptions?: RegisterOptions<FieldValues, string>,
}
