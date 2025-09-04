import axios from 'axios';
import { Task, CreateTaskRequest, UpdateTaskRequest, ApiResponse } from '../types/Task';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const taskApi = {
  // Get all tasks
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get<ApiResponse<Task>>('/api/tasks');
    return response.data.tasks || [];
  },

  // Create a new task
  createTask: async (task: CreateTaskRequest): Promise<Task> => {
    if (task.description === undefined) {
      delete task.description;
    }
    console.log('Creating task with data:', task);
    const response = await api.post<ApiResponse<Task>>('/api/tasks', task);
    return response.data.task!;
  },

  // Update a task
  updateTask: async (id: number, task: UpdateTaskRequest): Promise<Task> => {
    const response = await api.put<ApiResponse<Task>>(`/api/tasks/${id}`, task);
    return response.data.task!;
  },

  // Delete a task
  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/api/tasks/${id}`);
  },
};
