import Head from "next/head";
import React, { useState } from "react";
import NewTodoInput from "src/components/NewTodoInput";
import TodoFooter from "src/components/TodoFooter";
import TodoList from "src/components/TodoList";
import TodoMarkAll from "src/components/TodoMarkAll";
import { Todo } from "src/models/todo";

const newID = (() => {
    let id = 1;
    return () => id++;
  })();

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editingId, setEditingId] = useState<number>(0);
    const [newTodoText, setNewTodoText] = useState<String>("");

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
        setEditingId(id);
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
        setEditingId(id);
    };

    const onNewTodo = (text: string) => {
        if (!text.trim()) {
            return;
        }
        const curId = newID();
        const newTodo: Todo = {
            id: curId,
            title: text.trim(),
            completed: false,
        };

        setTodos([...todos, newTodo]);
        setEditingId(curId);
    };

    const editTodo = (id: number, text: string) => {
        if (!text.trim()) return; // Prevent saving empty edits

        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, title: text.trim() } : todo
        ));
        setEditingId(0); // Clear editing state after editing
    };

    const onEdit = (id: number) => {
        setEditingId(id);
        const todoToEdit = todos.find(todo => todo.id === id);
        if (todoToEdit) {
            setNewTodoText(todoToEdit.title);
        }
        setEditingId(id);
    };

    // console.log(todos);

    
    return (
        <>
            <Head>
                <title>TodoMVC</title>
            </Head>

            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTodoInput
                        onNewTodo={onNewTodo}
                    />
                </header>

                <section className="main">
                    <TodoMarkAll
                        numCompletedTodos={0}
                        numTodos={todos.length}
                        onMarkAllActive={() =>
                            console.log("onMarkAllActive was called")
                        }
                        onMarkAllCompleted={() =>
                            console.log("onMarkAllCompleted was called")
                        }
                    />
                    <TodoList
                        todos={todos}
                        editingId={editingId}
                        onEdit={onEdit}
                        onDelete={deleteTodo}
                        onToggleComplete={() => toggleTodo}
                        onSetTitle={(editingId, title) => editTodo(editingId, title)}
                    />
                </section>

                <TodoFooter
                    filter="all"
                    numActiveTodos={0}
                    numTodos={0}
                    onClearCompleted={() => {}}
                />
            </section>

            <footer className="info">
                <p>Double-click to edit a todo</p>
                <p>
                    Part of <a href="http://todomvc.com">TodoMVC</a>
                </p>
            </footer>
        </>
    );
}
