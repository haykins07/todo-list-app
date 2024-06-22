const router = require('express').Router();
let Task = require('../models/Task');

// Get all tasks
router.route('/').get((req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new task
router.route('/add').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    const newTask = new Task({
        title,
        description,
    });

    newTask.save()
        .then(() => res.json('Task added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a specific task by id
router.route('/:id').get((req, res) => {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a specific task by id
router.route('/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json('Task deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update a specific task by id
router.route('/update/:id').post((req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            task.title = req.body.title;
            task.description = req.body.description;
            task.completed = req.body.completed;

            task.save()
                .then(() => res.json('Task updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
