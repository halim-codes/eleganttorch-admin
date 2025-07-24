import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import { fetchUsers, addUser, updateUser, deleteUser, getUserById } from '../services/userService';
import { User } from '../types/User';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [newUser, setNewUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [adding, setAdding] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data || []);
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


   const findOne = async (userId: string): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const category = await getUserById(userId);
      return category;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to fetch user");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const add = async (userData: Omit<User, "_id">) => {
    setAdding(true);
    setError(null);
    try {
      const createdUser = await addUser(userData);
      setNewUser(createdUser);
      setUsers(prev => [...prev, createdUser]);
      return createdUser || null;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to add user");
    } finally {
      setAdding(false);
    }
  };

  const update = async (userId: string, updatedData: Partial<User>) => {
    setUpdating(true);
    setError(null);
    try {
      const updatedCategory = await updateUser(userId, updatedData);
      setUsers(prev =>
        prev.map(c => (c._id === updatedCategory._id ? updatedCategory : c))
      );
      return updatedCategory || null;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to update category");
    } finally {
      setUpdating(false);
    }
  };


  const remove = async (userId: string) => {
    setRemoving(true);
    setError(null);
    try {
      await deleteUser(userId);
      setUsers(prev => prev.filter(c => c._id !== userId));
      return true;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to delete user");
    } finally {
      setRemoving(false);
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
      remove,
    removing,
      update,
    updating,
    findOne,
    newUser,
  };
};

