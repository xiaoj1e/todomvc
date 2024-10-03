import { useEffect, useRef } from "react";

type Props = {
    onNewTodo: (title: string) => void;
};

export default function NewTodoInput({ onNewTodo }: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter" && inputRef.current !== null) {
            onNewTodo(inputRef.current.value);
            inputRef.current.value = "";
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <input
            className="new-todo"
            ref={inputRef}
            placeholder="What needs to be done?"
            onKeyPress={onKeyPress}
            autoFocus={true}
        />
    );
}
