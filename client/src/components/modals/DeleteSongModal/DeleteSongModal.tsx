import Modal from "../Modal.tsx";
import {DeleteSongModalInterfaces} from "./DeleteSongModal.interfaces.ts";

export default function DeleteSongModal(props: DeleteSongModalInterfaces) {

    const handleCancel = () => {
        props.onCancel();
    }

    return (
        <Modal isOpen={props.isOpen} header="Delete Song" onCancel={handleCancel}>
            <p>Are you sure you want to delete <b>{props.title}</b>?</p>
            <p>This action cannot be undone.</p>
            <div className="mt-16 flex flex-row gap-2 justify-end">
                <button type="button" className="bg-zinc-500 text-white p-3 rounded w-32"
                        onClick={handleCancel}>Cancel
                </button>
                <button className="bg-blue-500 text-white p-3 rounded w-32" onClick={props.onDeleteSong}>Delete</button>
            </div>
        </Modal>
    );
}
