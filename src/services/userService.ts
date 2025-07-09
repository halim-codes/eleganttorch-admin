import api from '../lib/axios';
import { User } from '../types/User';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users');
  return response.data;
};

export const updateUser = async (
  updatedUserData: Partial<User>
): Promise<User> => {
  try {
    const response = await api.put<User>('/users/update', updatedUserData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
