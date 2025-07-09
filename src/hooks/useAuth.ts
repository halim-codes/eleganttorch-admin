import { useState } from "react";
import { authService } from "@/services/authService";
import { LoginCredentials, LoginResponse } from "@/types/Auth";
import { User } from "@/types/User";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      
      localStorage.setItem("token", response.access_token);
      
      return response;
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async (): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.fetchCurrentUser();
      return user;
    } catch (err: any) {
      setError("Failed to fetch user");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return {
    login,
    fetchCurrentUser,
    logout,
    loading,
    error,
  };
}
