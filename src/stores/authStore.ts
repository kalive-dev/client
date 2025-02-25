import { create } from "zustand";
import API from "../api";

interface AuthState {
  user: { id: number; email: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  login: async (email, password) => {
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.data.token);
      set({ user: { id: data.data.id, email }, token: data.data.token });
    } catch (error) {
      throw new Error("Login failed");
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
