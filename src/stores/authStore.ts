// stores/authStore.ts
import { create } from "zustand";
import API from "../api";
import { User } from "../types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  userId: number | null;
}

export const useAuthStore = create<AuthState>((set) => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    userId: storedUser ? JSON.parse(storedUser).id : null,
    login: async (email, password) => {
      try {
        const { data } = await API.post("/auth/login", { email, password });
        const user = { id: data.data.id, email };
        console.log("user id is" + user.id);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        set({
          user: user,
          token: data.data.token,
          userId: data.data.id,
        });
      } catch (error) {
        throw new Error("Login failed");
      }
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ user: null, token: null, userId: null });
    },
  };
});
