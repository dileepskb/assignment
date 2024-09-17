import React, { useState, useEffect } from 'react';
import {TodoItem } from './components/Todo'
import { Filter } from './components/Filtter';
import './App.css'

const App = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) setTodos(storedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text) => {
        setTodos([...todos, { text, completed: false }]);
    };

    const toggleComplete = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'completed') return todo.completed;
        if (filter === 'pending') return !todo.completed;
    });

    return (
        <div>
            <h1>Todo List</h1>
            <AddTodo addTodo={addTodo} />
            <Filter setFilter={setFilter} />
            <TodoList todos={filteredTodos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
        </div>
    );
};

const AddTodo = ({ addTodo }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        addTodo(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a task" />
            <button type="submit">Add</button>
        </form>
    );
};

const TodoList = ({ todos, toggleComplete, deleteTodo }) => (
    <ul>
        {todos.map((todo, index) => (
            <TodoItem
                key={index}
                todo={todo}
                toggleComplete={() => toggleComplete(index)}
                deleteTodo={() => deleteTodo(index)}
            />
        ))}
    </ul>
);





export default App;
