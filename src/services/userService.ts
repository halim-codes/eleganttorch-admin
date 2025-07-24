import api from '../lib/axios';
import { User } from '../types/User';
import { ApiResponse } from "../types/ApiResponse";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<ApiResponse<User[]>>("/users");
  return response.data.data;
};

export const getUserById = async (
  userId: string
): Promise<User> => {
  try {
    const response = await api.get<ApiResponse<User>>(`/users/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

export const addUser = async (
  newUserData: Omit<User, '_id'>
): Promise<User> => {
  const response = await api.post<User>('/users/create-user', newUserData);
  return response.data;
};

export const updateUser = async (
  id: string,
  updatedUserData: Partial<User>
): Promise<User> => {
  try {
    const response = await api.patch<ApiResponse<User>>(`/users/${id}`, updatedUserData);
    return response.data.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (
  userId: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

