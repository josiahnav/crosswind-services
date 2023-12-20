import {TextInputProps} from "./TextInput.interfaces.ts";

export default function TextInput(props: TextInputProps) {
    return (
        <>
            <label htmlFor={props.id} className="text-xs text-zinc-600">{props.children}</label>
            <br/>
            <input type="text"
                   id={props.id}
                   {...props.register(props.name, props.registerOptions)}
                   className="p-2 w-full bg-zinc-50 border border-zinc-300 rounded focus:outline-none"/>
        </>
    );
}
