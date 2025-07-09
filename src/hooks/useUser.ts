import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import { fetchUsers,updateUser } from '../services/userService';
import { User } from '../types/User';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.response) {
        setError(`Server Error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        setError('Network error: No response received from server');
      } else {
        setError(error.message || 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { users, loading, error, refetch: fetchData };
};

export const useUpdateUser = (token: string | null) => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);

  const update = async (updatedData: Partial<User>) => {
    if (!token) {
      setError('No token provided');
      return;
    }

    setUpdating(true);
    setError(null);
    try {
      const result = await updateUser(token, updatedData);
      setUpdatedUser(result);
      return result;
    } catch (err: any) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  return { update, updating, error, updatedUser };
};
