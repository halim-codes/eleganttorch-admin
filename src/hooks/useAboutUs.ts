import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import {
  fetchAboutUsContent,
  addAboutUs,
  deleteAboutUs,
  updateAboutUs,
  getAboutUsById,
} from '../services/AboutUsService';
import { AboutUs } from '../types/AboutUs';

export const useAboutUs = () => {
  const [sections, setSections] = useState<AboutUs[]>([]);
  const [newSection, setNewSection] = useState<AboutUs | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAboutUsContent();
      setSections(res.data || []);
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to fetch about us content");
    } finally {
      setLoading(false);
    }
  }, []);

  const findOne = async (sectionId: string): Promise<AboutUs | null> => {
    setLoading(true);
    setError(null);
    try {
      const section = await getAboutUsById(sectionId);
      return section;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to fetch about section");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const add = async (sectionData: Omit<AboutUs, "_id">) => {
    setAdding(true);
    setError(null);
    try {
      const newSection = await addAboutUs(sectionData);
      setNewSection(newSection);
      setSections(prev => [...prev, newSection]);
      return newSection || null;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to add about section");
    } finally {
      setAdding(false);
    }
  };

  const update = async (sectionId: string, updatedData: Partial<AboutUs>) => {
    setUpdating(true);
    setError(null);
    try {
      const updated = await updateAboutUs(sectionId, updatedData);
      setSections(prev => prev.map(s => (s._id === updated._id ? updated : s)));
      return updated || null;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to update about section");
    } finally {
      setUpdating(false);
    }
  };

  const remove = async (sectionId: string) => {
    setRemoving(true);
    setError(null);
    try {
      await deleteAboutUs(sectionId);
      setSections(prev => prev.filter(s => s._id !== sectionId));
      return true;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to delete about section");
    } finally {
      setRemoving(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    sections,
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
    newSection,
  };
};
