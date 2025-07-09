import axiosInstance from "@/lib/axios";
import { LoginCredentials, LoginResponse } from "@/types/Auth";
import { User } from "@/types/User";


export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {

    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/login", credentials);
      const { access_token, user } = response.data;
      
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await axiosInstance.get<User>("/auth/me");
      return response.data;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  },
};
