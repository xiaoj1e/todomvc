import { useCallback, useEffect, useRef, useState } from "react";
import { ENTER_KEY, ESCAPE_KEY } from "src/models/constants";

interface EditProps {
    title: string;
    editing: boolean;
    id: number;
    onSetTitle: (id: number, title: string) => void;
}

export default function InputEdit({ title, editing, id, onSetTitle }: EditProps) {
    // local title for editing
    const [localTitle, setLocalTitle] = useState(title);
    // if the prop changes set the local title to it
    useEffect(() => {
        setLocalTitle(title);
    }, [title]);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const onCommitTitle = useCallback(() => {
        onSetTitle(id, localTitle);
    }, [onSetTitle, localTitle]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.target.value);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === ENTER_KEY && onCommitTitle();
        e.key === ESCAPE_KEY && onCommitTitle();
    };

    const editingRef = useRef<boolean>(false);
    useEffect(() => {
        if (!editingRef.current && editing) {
            inputRef.current?.focus();
        }
        editingRef.current = editing;
    }, [editing]);

    return (
        <input
            className="edit"
            ref={inputRef}
            value={localTitle}
            onChange={onChange}
            onBlur={onCommitTitle}
            onKeyDown={onKeyDown}
        />
    );
}
