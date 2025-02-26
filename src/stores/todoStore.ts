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
import { Task, TodoList } from "../types/todo";

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
      const formattedLists: TodoList[] = data.data.map((list: any) => ({
        id: list.id,
        name: list.name,
        tasks: [],
      }));
      set({ lists: formattedLists });
    } catch (error) {
      console.error("Error loading lists:", error);
    }
  },

  loadTasks: async (todolistId: number) => {
    try {
      const { data } = await fetchTasks(todolistId);
      const formattedTasks: Task[] = data.data.map((task: any) => ({
        id: task.id,
        name: task.name,
        completed: task.completed,
      }));
      set((state) => ({
        lists: state.lists.map((list) =>
          list.id === todolistId ? { ...list, tasks: formattedTasks } : list
        ),
      }));
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  },

  createList: async (name: string) => {
    try {
      const { data } = await createTodoList(name);
      const newList: TodoList = {
        id: data.id,
        name: data.name,
        tasks: [],
      };
      set((state) => ({ lists: [...state.lists, newList] }));
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
      const { data } = await apiCreateTask(todolistId, name, "");
      const newTask: Task = {
        id: data.id,
        name: data.name,
        completed: false,
      };
      set((state) => ({
        lists: state.lists.map((list) =>
          list.id === todolistId
            ? { ...list, tasks: [...list.tasks, newTask] }
            : list
        ),
      }));
    } catch (error) {
      console.error("Error creating task:", error);
    }
  },

  deleteTask: async (todolistId: number, taskId: number) => {
    try {
      await apiDeleteTask(todolistId, taskId);
      set((state) => ({
        lists: state.lists.map((list) =>
          list.id === todolistId
            ? {
                ...list,
                tasks: list.tasks.filter((task) => task.id !== taskId),
              }
            : list
        ),
      }));
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
      set((state) => ({
        lists: state.lists.map((list) =>
          list.id === todolistId
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === taskId ? { ...task, completed } : task
                ),
              }
            : list
        ),
      }));
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  },
}));
