// Import express router
const router = require('express').Router();
// Import the Task model
let Task = require('../models/Task');

// Route to get all tasks
router.route('/').get((req, res) => {
    // Find all tasks in the database
    Task.find()
        .then(tasks => res.json(tasks)) // Return tasks as JSON if successful
        .catch(err => res.status(400).json('Error: ' + err)); // Return error if any
});

// Route to add a new task
router.route('/add').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    // Create a new task with the provided title and description
    const newTask = new Task({
        title,
        description,
    });

    // Save the new task to the database
    newTask.save()
        .then(() => res.json('Task added!')) // Return success message if saved
        .catch(err => res.status(400).json('Error: ' + err)); // Return error if any
});

// Route to get a specific task by id
router.route('/:id').get((req, res) => {
    // Find a task by its id
    Task.findById(req.params.id)
        .then(task => res.json(task)) // Return the task as JSON if found
        .catch(err => res.status(400).json('Error: ' + err)); // Return error if any
});

// Route to delete a specific task by id
router.route('/:id').delete((req, res) => {
    // Find a task by its id and delete it
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json('Task deleted.')) // Return success message if deleted
        .catch(err => res.status(400).json('Error: ' + err)); // Return error if any
});

// Route to update a specific task by id
router.route('/update/:id').post((req, res) => {
    // Find a task by its id
    Task.findById(req.params.id)
        .then(task => {
            // Update the task fields with new values from the request body
            task.title = req.body.title;
            task.description = req.body.description;
            task.completed = req.body.completed;

            // Save the updated task to the database
            task.save()
                .then(() => res.json('Task updated!')) // Return success message if saved
                .catch(err => res.status(400).json('Error: ' + err)); // Return error if any
        })
        .catch(err => res.status(400).json('Error: ' + err)); // Return error if task not found
});

// Export the router to be used in other parts of the application
module.exports = router;
