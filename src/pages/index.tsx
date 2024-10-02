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
    const [editingId, setEditingId] = useState<number>(0);
    const [currentFilter, setCurrentFilter] = useState<Filter>(ALL);

    const toggleTodo = (id: number) => {
        setTodos(todos.map<Todo>((todo : Todo) => 
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
        if (!text.trim()) {
            return;
        }
        setTodos(todos.map<Todo>((todo : Todo) => 
            todo.id === id ? { ...todo, title: text.trim() } : todo
        ));
        setEditingId(0);
    };

    const onEdit = (id: number) => {
        setEditingId(id);
    };
    
    const completedCount = useMemo(() => {
        return todos.reduce((acc, cur) => cur.completed ? ++acc : acc, 0)
    }, [todos]);

    const onClearCompleted = () => {
        setTodos(todos.filter((todo) => {
          return !todo.completed;
        }));
    };

    const onMarkAllActive = () => {
        const allCompleted = todos.every(todo => todo.completed);
        setTodos(todos.map<Todo>((todo : Todo) => ({ ...todo, completed: !allCompleted })));
    };

    const onMarkAllCompleted = () => {
        const allActive = todos.every(todo => todo.completed);
        setTodos(todos.map<Todo>((todo : Todo) => ({ ...todo, completed: !allActive })));
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

    console.log(todos);
    console.log(currentFilter);

    
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
                        onMarkAllActive={onMarkAllActive}
                        onMarkAllCompleted={onMarkAllCompleted}
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
