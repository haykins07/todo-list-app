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
import { Save, Edit, Delete } from '@mui/icons-material'; // Updated import statement

const TodoList = ({ todos, deleteTodo, editTodo }) => {
    const [isEditing, setIsEditing] = useState(null);
    const [currentTodo, setCurrentTodo] = useState('');

    const handleEdit = (index, todo) => {
        setIsEditing(index);
        setCurrentTodo(todo);
    };

    const handleEditSubmit = (index) => {
        editTodo(index, currentTodo);
        setIsEditing(null);
        setCurrentTodo('');
    };

    return (
        <div>
            <h2>Todo List</h2>
            <List>
                {todos.map((todo, index) => (
                    <ListItem key={index} divider>
                        {isEditing === index ? (
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={8}>
                                    <TextField
                                        value={currentTodo}
                                        onChange={(e) => setCurrentTodo(e.target.value)}
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
