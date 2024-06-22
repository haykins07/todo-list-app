// Import necessary modules and components
import React, { useEffect, useState } from 'react';
import { fetchTasks, addTask, updateTask, deleteTask } from '../services/tasksService';

const TasksList = () => {
  // State to hold the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to hold the new task details
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  // useEffect hook to fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks()
      .then(tasks => setTasks(tasks)) // Set the fetched tasks to state
      .catch(error => console.error('Error fetching tasks:', error)); // Handle errors
  }, []);

  // Function to handle adding a new task
  const handleAddTask = () => {
    addTask(newTask)
      .then(() => {
        // Reset the new task input fields
        setNewTask({ title: '', description: '' });
        // Fetch the updated list of tasks
        fetchTasks().then(tasks => setTasks(tasks));
      })
      .catch(error => console.error('Error adding task:', error)); // Handle errors
  };

  // Function to handle updating an existing task
  const handleUpdateTask = (taskId, updatedTaskData) => {
    updateTask(taskId, updatedTaskData)
      .then(() => fetchTasks().then(tasks => setTasks(tasks))) // Fetch the updated list of tasks
      .catch(error => console.error('Error updating task:', error)); // Handle errors
  };

  // Function to handle deleting a task
  const handleDeleteTask = (taskId) => {
    deleteTask(taskId)
      .then(() => fetchTasks().then(tasks => setTasks(tasks))) // Fetch the updated list of tasks
      .catch(error => console.error('Error deleting task:', error)); // Handle errors
  };

  return (
    <div>
      <h2>Tasks List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button onClick={() => handleUpdateTask(task._id, { ...task, completed: !task.completed })}>
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Add New Task</h2>
      <input
        type="text"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        placeholder="Title"
      />
      <textarea
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        placeholder="Description"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TasksList;
