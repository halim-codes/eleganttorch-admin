import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import { fetchUsers, addUser } from '../services/userService';
import { User } from '../types/User';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newUser, setNewUser] = useState<User | null>(null);
  const [adding, setAdding] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data.data || []);
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(
        axiosError.response
          ? `Server Error: ${axiosError.response.status} - ${axiosError.response.statusText}`
          : axiosError.request
          ? "Network error: No response received from server"
          : axiosError.message || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const add = async (userData: Omit<User, "id">) => {
    setAdding(true);
    setError(null);
    try {
      const createdUser = await addUser(userData);
      setNewUser(createdUser);
      setUsers(prev => [...prev, createdUser]);
      return createdUser;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to add user");
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    users,
    loading,
    error,
    refetch: fetchData,
    add,
    adding,
    newUser,
  };
};

