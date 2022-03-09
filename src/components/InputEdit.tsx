import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
    title: string;
    editing: boolean;
    onSetTitle: (title: string) => void;
}

export default function InputEdit({ title, editing, onSetTitle }: Props) {
    // local title for editing
    const [localTitle, setLocalTitle] = useState(title);
    // if the prop changes set the local title to it
    useEffect(() => {
        setLocalTitle(title);
    }, [title]);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const onCommitTitle = useCallback(() => {
        onSetTitle(localTitle);
    }, [onSetTitle, localTitle]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.target.value);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onCommitTitle();
        e.key === "Escape" && onCommitTitle();
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
