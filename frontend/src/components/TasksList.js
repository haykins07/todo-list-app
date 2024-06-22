import React, { useEffect, useState } from 'react';
import { fetchTasks, addTask, updateTask, deleteTask } from '../services/tasksService';

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks()
      .then(tasks => setTasks(tasks))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = () => {
    addTask(newTask)
      .then(() => {
        setNewTask({ title: '', description: '' });
        fetchTasks().then(tasks => setTasks(tasks));
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const handleUpdateTask = (taskId, updatedTaskData) => {
    updateTask(taskId, updatedTaskData)
      .then(() => fetchTasks().then(tasks => setTasks(tasks)))
      .catch(error => console.error('Error updating task:', error));
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId)
      .then(() => fetchTasks().then(tasks => setTasks(tasks)))
      .catch(error => console.error('Error deleting task:', error));
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
