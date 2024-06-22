// Import mongoose module to interact with MongoDB
const mongoose = require('mongoose');

// Create a schema constructor from mongoose
const Schema = mongoose.Schema;

// Define the schema for a task
const taskSchema = new Schema({
    // Title of the task, required field
    title: { type: String, required: true },
    // Description of the task, required field
    description: { type: String, required: true },
    // Completion status of the task, default is false
    completed: { type: Boolean, default: false }
}, {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
});

// Create a model from the schema
const Task = mongoose.model('Task', taskSchema);

// Export the Task model for use in other parts of the application
module.exports = Task;
