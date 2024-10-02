import clsx from "clsx";
import { Todo } from "src/models/todo";

import InputEdit from "./InputEdit";

interface TodoItemProps {
    todo: Todo;
    editing: boolean;
    id: number,
    onEdit: (id: number) => void;
    onDelete: () => void;
    onToggleComplete: () => void;
    onSetTitle: (id: number, title: string) => void;
}

export default function TodoItem({
    todo,
    editing,
    id,
    onEdit,
    onDelete,
    onToggleComplete,
    onSetTitle,
}: TodoItemProps) {
    const onChangeCheckbox = (_: React.ChangeEvent<HTMLInputElement>) => {
        onToggleComplete();
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
                id={id}
                onSetTitle={onSetTitle}
            />
        </li>
    );
}
