// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

// Main App component
function App() {
    // State to keep track of the list of todos
    const [todos, setTodos] = useState([]);

    // useEffect hook to load saved todos from localStorage when the component mounts
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
            setTodos(savedTodos);
        }
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // useEffect hook to save todos to localStorage whenever the todos state changes
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]); // Runs every time the todos state changes

    // Function to add a new todo
    const addTodo = (todo) => {
        setTodos([...todos, todo]); // Adds the new todo to the existing list of todos
    };

    // Function to delete a todo
    const deleteTodo = (index) => {
        const newTodos = [...todos]; // Creates a copy of the existing todos
        newTodos.splice(index, 1); // Removes the todo at the specified index
        setTodos(newTodos); // Updates the todos state with the new list
    };

    // Function to edit a todo
    const editTodo = (index, newTodo) => {
        const newTodos = [...todos]; // Creates a copy of the existing todos
        newTodos[index] = newTodo; // Replaces the todo at the specified index with the new todo
        setTodos(newTodos); // Updates the todos state with the new list
    };

    return (
        <div className="App">
            <h1>Todo List App</h1>
            {/* Passes the addTodo function as a prop to the TodoForm component */}
            <TodoForm addTodo={addTodo} />
            {/* Passes the todos, deleteTodo, and editTodo functions as props to the TodoList component */}
            <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />
        </div>
    );
}

export default App;
