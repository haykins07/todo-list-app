import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const TodoForm = ({ addTodo }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            addTodo(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={9}>
                    <TextField
                        variant="outlined"
                        label="New Todo"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Add Todo
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TodoForm;
