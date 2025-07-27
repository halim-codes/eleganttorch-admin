import api from '../lib/axios';
import { Category } from '../types/Category';
import { ApiResponse } from "../types/ApiResponse";
import { Product } from '@/types/Product';

export const fetchProducts = async (): Promise<ApiResponse<Product[]>> => {
  const response = await api.get<ApiResponse<Product[]>>("/products");
  return response.data;
};

export const getProductById = async (
  productId: string
): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
};

export const addProduct = async (
  newProductsData: Omit<Product, '_id'> 
): Promise<Product> => {
  const response = await api.post<Product>('/products', newProductsData);
  return response.data;
};

export const updateProducts = async (
  id: string,
  updatedProductsData: Partial<Product>
): Promise<Product> => {
  try {
    const response = await api.patch<Product>(`/products/${id}`, updatedProductsData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProducts = async (
  productId: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

