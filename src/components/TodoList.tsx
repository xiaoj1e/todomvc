import TodoItem from "./TodoItem";
import { Todo } from "src/models/todo";
import React, { useCallback } from "react";

type ListProps = {
    todos: Todo[];
    editingId: number;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onToggleComplete: (id: number) => void;
    onSetTitle: (id: number, title: string) => void;
};

export default function TodoList({
    todos,
    editingId,
    onEdit,
    onDelete,
    onToggleComplete,
    onSetTitle,
}: ListProps) {
    const Item = useCallback(
        ({ todo }: { todo: Todo }) => {
            return (
                <TodoItem
                    todo={todo}
                    id={editingId}
                    editing={editingId === todo.id}
                    onEdit={() => onEdit(todo.id)}
                    onToggleComplete={() => onToggleComplete(todo.id)}
                    onDelete={() => onDelete(todo.id)}
                    onSetTitle={onSetTitle}
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
