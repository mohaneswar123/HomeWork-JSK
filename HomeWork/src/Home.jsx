import React, { useState, useEffect } from 'react';
import taskService from './services/taskService';
import './Home.css';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  // Load all tasks when component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const tasksData = await taskService.getAllTasks();
      setTasks(tasksData);
    } catch (err) {
      setError('Failed to load tasks: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      setError('Please enter a task');
      return;
    }

    try {
      setError('');
      const taskData = { task: newTask.trim() };
      await taskService.addTask(taskData);
      setNewTask('');
      setSuccess('Task added successfully!');
      loadTasks(); // Reload tasks
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add task: ' + err.message);
    }
  };

  const handleEditTask = async (task) => {
    try {
      setError('');
      const updatedTask = { id: task.id, task: editTaskText.trim() };
      await taskService.editTask(updatedTask);
      setEditingTask(null);
      setEditTaskText('');
      setSuccess('Task updated successfully!');
      loadTasks(); // Reload tasks
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update task: ' + err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setError('');
      await taskService.deleteTask(id);
      setSuccess('Task deleted successfully!');
      loadTasks(); // Reload tasks
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete task: ' + err.message);
    }
  };

  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditTaskText(task.task);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditTaskText('');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Task Manager</h1>

      {/* Add Task Form */}
      <div className="task-form">
        <h2>Add New Task</h2>
        <form onSubmit={handleAddTask}>
          <div className="form-group">
            <label className="form-label">Task Description:</label>
            <input
              type="text"
              className="form-input"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter your task here..."
              maxLength="500"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>
      </div>

      {/* Status Messages */}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      {/* Tasks List */}
      <div className="tasks-section">
        <h2 className="section-title">All Tasks</h2>

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="no-tasks">No tasks found. Add your first task above!</div>
        ) : (
          <div>
            {tasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-id">Task ID: {task.id}</div>
                <div className="task-content">
                  {editingTask === task.id ? (
                    <div style={{ flex: 1, marginRight: '15px' }}>
                      <input
                        type="text"
                        className="form-input"
                        value={editTaskText}
                        onChange={(e) => setEditTaskText(e.target.value)}
                        maxLength="500"
                      />
                    </div>
                  ) : (
                    <div className="task-text">{task.task}</div>
                  )}
                  
                  <div className="task-actions">
                    {editingTask === task.id ? (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() => handleEditTask(task)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={() => startEdit(task)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="refresh-container">
        <button className="btn btn-secondary" onClick={loadTasks}>
          Refresh Tasks
        </button>
      </div>
    </div>
  );
};

export default Home;
