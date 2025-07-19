import api from '../lib/axios';
import { Category } from '../types/Category';
import { ApiResponse } from "../types/ApiResponse";

export const fetchCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await api.get<ApiResponse<Category[]>>("/categories");
  return response.data;
};

export const getCategoryById = async (
  categoryId: string
): Promise<Category> => {
  try {
    const response = await api.get<Category>(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting category:", error);
    throw error;
  }
};

export const addCategorie = async (
  newCategoriesData: Omit<Category, '_id'> 
): Promise<Category> => {
  const response = await api.post<Category>('/categories', newCategoriesData);
  return response.data;
};

export const updateCategories = async (
  id: string,
  updatedCategoriesData: Partial<Category>
): Promise<Category> => {
  try {
    const response = await api.patch<Category>(`/categories/${id}`, updatedCategoriesData);
    return response.data;
  } catch (error) {
    console.error("Error updating categorie:", error);
    throw error;
  }
};

export const deleteCategory = async (
  categoryId: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

