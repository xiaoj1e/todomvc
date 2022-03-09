import TodoItem from "./TodoItem";
import { Todo } from "src/models/todo";
import React, { useCallback } from "react";

type Props = {
    todos: Todo[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onToggleComplete: (id: number) => void;
    onSetTitle: (id: number, title: string) => void;
};

export default function TodoList({
    todos,
    onEdit,
    onDelete,
    onToggleComplete,
    onSetTitle,
}: Props) {
    const Item = useCallback(
        ({ todo }: { todo: Todo }) => {
            return (
                <TodoItem
                    todo={todo}
                    onEdit={() => onEdit(todo.id)}
                    onToggleComplete={() => onToggleComplete(todo.id)}
                    onDelete={() => onDelete(todo.id)}
                    onSetTitle={(title) => onSetTitle(todo.id, title)}
                />
            );
        },
        [onEdit, onDelete, onToggleComplete, onSetTitle]
    );

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <Item key={todo.id} todo={todo} />
            ))}
        </ul>
    );
}
