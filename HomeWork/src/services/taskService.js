import axios from 'axios';

// Base URL for your Spring Boot backend
const BASE_URL = 'http://localhost:2005/myhometaskmanager/api/tasks';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Task Service functions
export const taskService = {
  // Add a new task
  addTask: async (task) => {
    try {
      const response = await api.post('/add', task);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'Error adding task');
    }
  },

  // Edit/Update a task
  editTask: async (task) => {
    try {
      const response = await api.put('/edit', task);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'Error updating task');
    }
  },

  // Get task by ID
  getTaskById: async (id) => {
    try {
      const response = await api.get(`/get/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'Task not found');
    }
  },

  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await api.get('/getAll');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'Error fetching tasks');
    }
  },

  // Delete task by ID
  deleteTask: async (id) => {
    try {
      const response = await api.delete(`/delete/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'Error deleting task');
    }
  },
};

export default taskService;
