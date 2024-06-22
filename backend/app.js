// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from a .env file

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000; // Set the port from environment variable or default to 5000

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI); // Connect to MongoDB using the URI from environment variable

// Handle the connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully'); // Log success message when connected
});

// Routes
const tasksRouter = require('./routes/tasks'); // Import tasks router
app.use('/tasks', tasksRouter); // Use the tasks router for /tasks endpoint

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`); // Log message indicating server is running
});
