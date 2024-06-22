// Import necessary modules and components
import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    TextField,
    Grid
} from '@mui/material';
import { Save, Edit, Delete } from '@mui/icons-material'; // Icons for buttons

// TodoList component receives 'todos', 'deleteTodo', and 'editTodo' as props
const TodoList = ({ todos, deleteTodo, editTodo }) => {
    // State to keep track of the currently edited todo index and its value
    const [isEditing, setIsEditing] = useState(null);
    const [currentTodo, setCurrentTodo] = useState('');

    // Function to handle edit action
    const handleEdit = (index, todo) => {
        setIsEditing(index); // Set the index of the todo being edited
        setCurrentTodo(todo); // Set the current value of the todo being edited
    };

    // Function to handle submission of edited todo
    const handleEditSubmit = (index) => {
        editTodo(index, currentTodo); // Call editTodo function with the index and new value
        setIsEditing(null); // Reset editing state
        setCurrentTodo(''); // Clear the currentTodo state
    };

    return (
        <div>
            <h2>Todo List</h2>
            <List>
                {/* Map through the todos and display each one */}
                {todos.map((todo, index) => (
                    <ListItem key={index} divider>
                        {/* Check if the current todo is being edited */}
                        {isEditing === index ? (
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={8}>
                                    <TextField
                                        value={currentTodo} // Bind currentTodo state to the TextField
                                        onChange={(e) => setCurrentTodo(e.target.value)} // Update state on input change
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton onClick={() => handleEditSubmit(index)}>
                                        <Save />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ) : (
                            <>
                                <ListItemText primary={todo} />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => handleEdit(index, todo)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteTodo(index)}>
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </>
                        )}
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default TodoList;
