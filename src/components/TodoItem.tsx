import clsx from "clsx";
import { Todo } from "src/models/todo";

import InputEdit from "./InputEdit";

interface Props {
    todo: Todo;
    onEdit: () => void;
    onDelete: () => void;
    onToggleComplete: () => void;
    onSetTitle: (title: string) => void;
}

export default function TodoItem({
    todo,
    onEdit,
    onDelete,
    onToggleComplete,
    onSetTitle,
}: Props) {
    const onChangeCheckbox = (_: React.ChangeEvent<HTMLInputElement>) => {
        onToggleComplete();
    };

    const onDoubleClickLabel = (_: React.MouseEvent<HTMLLabelElement>) => {
        onEdit();
    };

    return (
        <li
            key={todo.id}
            className={clsx({
                editing: todo.editing,
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
                editing={todo.editing}
                onSetTitle={onSetTitle}
            />
        </li>
    );
}
