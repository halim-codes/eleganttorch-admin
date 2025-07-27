import api from '../lib/axios';
import { AboutUs } from '../types/AboutUs';
import { ApiResponse } from "../types/ApiResponse";

export const fetchAboutUsContent = async (): Promise<ApiResponse<AboutUs[]>> => {
  const response = await api.get<ApiResponse<AboutUs[]>>("/about-us");
  return response.data;
};

export const getAboutUsById = async (
  aboutId: string
): Promise<AboutUs> => {
  try {
    const response = await api.get<AboutUs>(`/about-us/${aboutId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting about us content:", error);
    throw error;
  }
};

export const addAboutUs = async (
  newAboutData: Omit<AboutUs, '_id'> 
): Promise<AboutUs> => {
  const response = await api.post<AboutUs>('/about-us', newAboutData);
  return response.data;
};

export const updateAboutUs = async (
  id: string,
  updatedAboutData: Partial<AboutUs>
): Promise<AboutUs> => {
  try {
    const response = await api.patch<AboutUs>(`/about-us/${id}`, updatedAboutData);
    return response.data;
  } catch (error) {
    console.error("Error updating about us content:", error);
    throw error;
  }
};

export const deleteAboutUs = async (
  aboutId: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/about-us/${aboutId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting about us content:", error);
    throw error;
  }
};
