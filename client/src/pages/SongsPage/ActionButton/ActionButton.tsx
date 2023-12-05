import {ActionButtonProps} from "./ActionButton.interfaces.ts";

export default function ActionButton(props: ActionButtonProps) {
    return (
        <div
            className="transition border border-blue-500 rounded w-56 py-6 pl-5 cursor-pointer
                hover:bg-blue-300 hover:border-blue-300" id="test" onClick={props.onClick}>
            <div className="font-bold text-3xl">{props.title}</div>
            <div>{props.subtitle}</div>
        </div>
    );
};
