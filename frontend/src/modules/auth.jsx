/** @format */

// authStore.js
import { create } from "zustand";
import { auth } from "../components/api/Auth"; // Assume this function fetches user data
import { logout } from "../components/api/Logout";

const useAuthStore = create((set, get) => ({
  userId: null, // To hold user data
  token: localStorage.getItem("token") || null,
  setToken: (newToken) => set({ token: newToken }),

  isAuthenticated: () => !!get().token, // Use get() to check if the user is authenticated

  // Function to check and fetch user data (not necessarily for login)
  fetchUserData: async () => {
    try {
      const response = await auth(); // This could be a GET request to fetch user data
      if (response.data.token === get().token) {
        set({ userId: response.data.userId, token: response.data.token });

        localStorage.setItem("token", response.data.token); // Store the token if available
      } else {
        get().clearAuth();
      }
    } catch (error) {
      console.error("error authentication:", error);
      get().clearAuth();
    }
  },
  logout: async () => {
    try {
      const response = await logout(); // This could be a GET request to fetch user data
      if (response) {
        get().clearAuth();
      }
    } catch (error) {
      console.error("error:", error);
    }
  },
  clearAuth: () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    set({ token: null, userId: null }); // Reset the state in the store
  },
}));

export default useAuthStore;
