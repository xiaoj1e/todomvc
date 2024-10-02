import clsx from "clsx";
import { Todo } from "src/models/todo";

import InputEdit from "./InputEdit";

interface TodoItemProps {
    todo: Todo;
    editing: boolean;
    onEdit: (id: number) => void;
    onDelete: () => void;
    onToggleComplete: (id: number) => void;
    onSetTitle: (id: number, title: string) => void;
}

export default function TodoItem({
    todo,
    editing,
    onEdit,
    onDelete,
    onToggleComplete,
    onSetTitle,
}: TodoItemProps) {
    const onChangeCheckbox = (_: React.ChangeEvent<HTMLInputElement>) => {
        onToggleComplete(todo.id);
    };

    const onDoubleClickLabel = (_: React.MouseEvent<HTMLLabelElement>) => {
        onEdit(todo.id);
    };

    return (
        <li
            key={todo.id}
            className={clsx({
                editing: editing,
                completed: todo.completed,
            })}
        >
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    onChange={onChangeCheckbox}
                    checked={todo.completed}
                />
                <label onDoubleClick={onDoubleClickLabel}>{todo.title}</label>
                <button className="destroy" onClick={() => onDelete()} />
            </div>
            <InputEdit
                title={todo.title}
                editing={editing}
                id={todo.id}
                onSetTitle={onSetTitle}
            />
        </li>
    );
}
