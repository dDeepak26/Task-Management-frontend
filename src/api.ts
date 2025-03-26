import axios from "axios";
import { tasksType } from "./types";

const API_URL = "http://localhost:8000/api/tasks";

// Get all tasks
export const getTasks = async () => axios.get(API_URL);

// Create a task
export const createTask = async (task: tasksType) => axios.post(API_URL, task);

// Update a task
export const updateTask = async (id: string, updatedTask: tasksType) =>
  axios.put(`${API_URL}/${id}`, updatedTask);

// Delete a task
export const deleteTask = async (id: string) =>
  axios.delete(`${API_URL}/${id}`);
