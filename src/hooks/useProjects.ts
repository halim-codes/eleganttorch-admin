import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import {
  fetchProjects,
  addProject,
  deleteProject,
  updateProject,
  getProjectById,
} from '../services/ProjectService';
import { Project } from '../types/Project';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchProjects();
      setProjects(res.data || []);
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }, []);

  const findOne = async (projectId: string): Promise<Project | null> => {
    setLoading(true);
    setError(null);
    try {
      const project = await getProjectById(projectId);
      return project;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to fetch project");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const add = async (projectData: Omit<Project, "_id">) => {
    setAdding(true);
    setError(null);
    try {
      const newProj = await addProject(projectData);
      setNewProject(newProj);
      setProjects(prev => [...prev, newProj]);
      return newProj || null;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to add project");
    } finally {
      setAdding(false);
    }
  };

  const update = async (projectId: string, updatedData: Partial<Project>) => {
    setUpdating(true);
    setError(null);
    try {
      const updated = await updateProject(projectId, updatedData);
      setProjects(prev =>
        prev.map(p => (p._id === updated._id ? updated : p))
      );
      return updated || null;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to update project");
    } finally {
      setUpdating(false);
    }
  };

  const remove = async (projectId: string) => {
    setRemoving(true);
    setError(null);
    try {
      await deleteProject(projectId);
      setProjects(prev => prev.filter(p => p._id !== projectId));
      return true;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to delete project");
    } finally {
      setRemoving(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    projects,
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
    newProject,
  };
};
