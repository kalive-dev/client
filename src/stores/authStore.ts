import { create } from "zustand";
import API from "../api";

interface AuthState {
  user: { id: number; email: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    login: async (email, password) => {
      try {
        const { data } = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", data.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ id: data.data.id, email })
        ); // Save user to localStorage
        set({ user: { id: data.data.id, email }, token: data.data.token });
      } catch (error) {
        throw new Error("Login failed");
      }
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // Remove user from localStorage
      set({ user: null, token: null });
    },
  };
});
