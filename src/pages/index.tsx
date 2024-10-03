import Head from "next/head";
import React, { useState, useMemo } from "react";
import NewTodoInput from "src/components/NewTodoInput";
import TodoFooter from "src/components/TodoFooter";
import TodoList from "src/components/TodoList";
import TodoMarkAll from "src/components/TodoMarkAll";
import { Todo } from "src/models/todo";
import { Filter, ALL, ACTIVE, COMPLETED } from "src/models/filter";

const newID = (() => {
    let id = 1;
    return () => id++;
  })();

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [history, setHistory] = useState<Todo[][]>([[]]); // First entry is blank
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [editingId, setEditingId] = useState<number>(0);
    const [currentFilter, setCurrentFilter] = useState<Filter>(ALL);

    const updateTodos = (newTodos: Todo[]) => {
        if (JSON.stringify(todos) !== JSON.stringify(newTodos)) {
            const newHistory = [...history.slice(0, currentIndex + 1), newTodos];
            setHistory(newHistory);
            setCurrentIndex(newHistory.length - 1);
        }
        setTodos(newTodos);
    };

    const toggleTodo = (id: number) => {
        updateTodos(todos.map<Todo>((todo : Todo) => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
        setEditingId(id);
    };

    const deleteTodo = (id: number) => {
        updateTodos(todos.filter(todo => todo.id !== id));
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

        updateTodos([...todos, newTodo]);
        setEditingId(curId);
    };

    const editTodo = (id: number, text: string) => {
        if (!text.trim()) {
            return;
        }
        updateTodos(todos.map<Todo>((todo : Todo) => 
            todo.id === id ? { ...todo, title: text.trim() } : todo
        ));
        setEditingId(0);
    };

    const onEdit = (id: number) => {
        setEditingId(id);
    };

    const undo = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setTodos(history[currentIndex - 1]);
        }
    };

    const redo = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setTodos(history[currentIndex + 1]);
        }
    };

    const completedCount = useMemo(() => {
        return todos?.reduce((acc, cur) => cur.completed ? ++acc : acc, 0)
    }, [todos]);

    const onClearCompleted = () => {
        updateTodos(todos.filter((todo) => {
          return !todo.completed;
        }));
    };

    const onMarkAll= () => {
        const allCompleted = todos.every(todo => todo.completed);
        updateTodos(todos.map<Todo>((todo : Todo) => ({ ...todo, completed: !allCompleted })));
    };

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === ACTIVE) {
            return !todo.completed;
        }
        else if (currentFilter === COMPLETED) {
            return todo.completed;
        }
        return true;
    });

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
                        numCompletedTodos={completedCount}
                        numTodos={todos.length}
                        onMarkAll={onMarkAll}
                    />
                    <TodoList
                        todos={filteredTodos}
                        editingId={editingId}
                        onEdit={onEdit}
                        onDelete={deleteTodo}
                        onToggleComplete={(editingId) => toggleTodo(editingId)}
                        onSetTitle={(editingId, title) => editTodo(editingId, title)}
                    />
                </section>

                <TodoFooter
                    filter={currentFilter}
                    setCurrentFilter={setCurrentFilter}
                    numActiveTodos={todos.length - completedCount}
                    numTodos={todos.length}
                    onClearCompleted={onClearCompleted}
                    undo={undo}
                    redo={redo}
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
