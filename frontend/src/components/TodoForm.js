// Import necessary modules and components
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

// TodoForm component receives 'addTodo' as a prop
const TodoForm = ({ addTodo }) => {
    // State to hold the input value for the new todo
    const [input, setInput] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (input.trim()) { // Check if input is not just whitespace
            addTodo(input); // Call addTodo function with the input value
            setInput(''); // Reset the input field
        }
    };

    return (
        // Form element with onSubmit event handler
        <form onSubmit={handleSubmit}>
            {/* Grid container for layout */}
            <Grid container spacing={2} alignItems="center">
                {/* Grid item for the TextField */}
                <Grid item xs={12} md={9}>
                    <TextField
                        variant="outlined"
                        label="New Todo"
                        value={input} // Bind input state to the TextField
                        onChange={(e) => setInput(e.target.value)} // Update state on input change
                        fullWidth // Make the TextField take full width
                    />
                </Grid>
                {/* Grid item for the Button */}
                <Grid item xs={12} md={3}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth // Make the Button take full width
                    >
                        Add Todo
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TodoForm;
