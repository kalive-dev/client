import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// API запити для списків
export const fetchTodoLists = () => API.get("/todolists");
export const createTodoList = (name: string) =>
  API.post("/todolists", { name });
export const updateTodoList = (id: number, name: string) =>
  API.put(`/todolists/${id}`, { name });
export const deleteTodoList = (id: number) => API.delete(`/todolists/${id}`);
// API запити для тудушок
export const fetchTasks = (todolistId: number) =>
  API.get(`/todolists/${todolistId}/tasks`);
export const createTask = (
  todolistId: number,
  name: string,
  description: string
) => API.post(`/todolists/${todolistId}/tasks`, { name, description });
export const updateTask = (
  todolistId: number,
  taskId: number,
  name: string,
  description: string
) => API.put(`/todolists/${todolistId}/tasks/${taskId}`, { name, description });
export const deleteTask = (todolistId: number, taskId: number) =>
  API.delete(`/todolists/${todolistId}/tasks/${taskId}`);
export const toggleTaskCompletion = (
  todolistId: number,
  taskId: number,
  completed: boolean
) => API.patch(`/todolists/${todolistId}/tasks/${taskId}`, { completed });

export default API;
