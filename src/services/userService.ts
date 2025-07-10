import api from '../lib/axios';
import { User } from '../types/User';
import { ApiResponse } from "../types/ApiResponse";

export const fetchUsers = async (): Promise<ApiResponse<User[]>> => {
  const response = await api.get<ApiResponse<User[]>>("/users");
  return response.data;
};

export const addUser = async (
  newUserData: Omit<User, 'id'> 
): Promise<User> => {
  const response = await api.post<User>('/users/create-user', newUserData);
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
