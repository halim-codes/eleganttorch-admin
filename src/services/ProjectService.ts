import api from '../lib/axios';
import { Project } from '../types/Project';
import { ApiResponse } from "../types/ApiResponse";

export const fetchProjects = async (): Promise<ApiResponse<Project[]>> => {
  const response = await api.get<ApiResponse<Project[]>>("/projects");
  return response.data;
};

export const getProjectById = async (
  projectId: string
): Promise<Project> => {
  try {
    const response = await api.get<Project>(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting project:", error);
    throw error;
  }
};

export const addProject = async (
  newProjectData: Omit<Project, '_id'> 
): Promise<Project> => {
  const response = await api.post<Project>('/projects', newProjectData);
  return response.data;
};

export const updateProject = async (
  id: string,
  updatedProjectData: Partial<Project>
): Promise<Project> => {
  try {
    const response = await api.patch<Project>(`/projects/${id}`, updatedProjectData);
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (
  projectId: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
