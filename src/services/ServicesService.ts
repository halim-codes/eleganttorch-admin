import api from '../lib/axios';
import { Service } from '../types/Service';
import { ApiResponse } from "../types/ApiResponse";

export const fetchServices = async (): Promise<ApiResponse<Service[]>> => {
  const response = await api.get<ApiResponse<Service[]>>("/services");
  return response.data;
};

export const getServiceById = async (
  serviceId: string
): Promise<Service> => {
  try {
    const response = await api.get<Service>(`/services/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting service:", error);
    throw error;
  }
};

export const addService = async (
  newServiceData: Omit<Service, '_id'> 
): Promise<Service> => {
  const response = await api.post<Service>('/services', newServiceData);
  return response.data;
};

export const updateService = async (
  id: string,
  updatedServiceData: Partial<Service>
): Promise<Service> => {
  try {
    const response = await api.patch<Service>(`/services/${id}`, updatedServiceData);
    return response.data;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

export const deleteService = async (
  serviceId: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/services/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};
