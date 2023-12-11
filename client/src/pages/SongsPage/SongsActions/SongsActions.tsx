import {useCallback, useState} from 'react';
import ActionButton from "../ActionButton/ActionButton.tsx";
import AddSongModal from "../../../components/modals/AddSongModal/AddSongModal.tsx";
import SongForTableDto from "../../../models/SongForTableDto.ts";
import {SongsActionsProps} from "./SongsActions.interfaces.ts";

export default function SongsActions(props: SongsActionsProps) {

    const [addSongIsOpen, setAddSongIsOpen] = useState(false);

    const handleAddSongClick = () => {
      setAddSongIsOpen(true);
    };

    const handleAddSong = useCallback((createdSong: SongForTableDto) => {
        props.onAddSong(createdSong);
        setAddSongIsOpen(false);
    }, [props]);

    const handleAddSongCancel = () => {
        setAddSongIsOpen(false);
    };

    const handleScheduleClick = useCallback(() => {
        console.log('Schedule');
    }, []);

    return (
        <div className="flex flex-row gap-6 mb-10 mx-auto">
            <AddSongModal onAddSong={handleAddSong} isOpen={addSongIsOpen} onCancel={handleAddSongCancel}></AddSongModal>
            <ActionButton title="Add" subtitle="a new worship song" onClick={handleAddSongClick}></ActionButton>
            <ActionButton title="Schedule" subtitle="a Sunday worship song"
                          onClick={handleScheduleClick}></ActionButton>
        </div>
    );
}
