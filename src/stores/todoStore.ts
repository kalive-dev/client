import { create } from "zustand";
import {
  fetchTodoLists,
  fetchTasks,
  createTodoList,
  deleteTodoList,
  createTask as apiCreateTask,
  deleteTask as apiDeleteTask,
  toggleTaskCompletion as apiToggleTaskCompletion,
} from "../api";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface TodoList {
  id: number;
  name: string;
  tasks: Task[];
}

interface TodoState {
  lists: TodoList[];
  loadLists: () => Promise<void>;
  loadTasks: (todolistId: number) => Promise<void>;
  createList: (name: string) => Promise<void>;
  deleteList: (id: number) => Promise<void>;
  createTask: (todolistId: number, name: string) => Promise<void>;
  deleteTask: (todolistId: number, taskId: number) => Promise<void>;
  toggleTaskCompletion: (
    todolistId: number,
    taskId: number,
    completed: boolean
  ) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  lists: [],

  loadLists: async () => {
    try {
      const { data } = await fetchTodoLists();
      set({ lists: data.data.map((list: any) => ({ ...list, tasks: [] })) });
    } catch (error) {
      console.error("Error loading lists:", error);
    }
  },

  loadTasks: async (todolistId: number) => {
    try {
      const { data } = await fetchTasks(todolistId);
      set((state) => ({
        lists: state.lists.map((list) =>
          list.id === todolistId ? { ...list, tasks: data.data } : list
        ),
      }));
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  },

  createList: async (name: string) => {
    try {
      await createTodoList(name);
      get().loadLists();
    } catch (error) {
      console.error("Error creating list:", error);
    }
  },

  deleteList: async (id: number) => {
    try {
      await deleteTodoList(id);
      set((state) => ({
        lists: state.lists.filter((list) => list.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  },

  createTask: async (todolistId: number, name: string) => {
    try {
      await apiCreateTask(todolistId, name, "");
      get().loadTasks(todolistId);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  },

  deleteTask: async (todolistId: number, taskId: number) => {
    try {
      await apiDeleteTask(todolistId, taskId);
      get().loadTasks(todolistId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  },

  toggleTaskCompletion: async (
    todolistId: number,
    taskId: number,
    completed: boolean
  ) => {
    try {
      await apiToggleTaskCompletion(todolistId, taskId, completed);
      get().loadTasks(todolistId);
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  },
}));
