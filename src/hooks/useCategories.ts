import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import { fetchCategories, addCategorie,deleteCategory, updateCategories,getCategoryById} from '../services/CategoriesService';
import { Category } from '../types/Category';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const [newCategories, setNewCategories] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [updating, setUpdating] = useState(false);


  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const categories = await fetchCategories();
      setCategories(categories.data || []);
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(
        axiosError.response
          ? `Server Error: ${axiosError.response.status} - ${axiosError.response.statusText}`
          : axiosError.request
          ? "Network error: No response received from server"
          : axiosError.message || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const findOne = async (categoryId: string): Promise<Category | null> => {
  setLoading(true);
  setError(null);
  try {
    const category = await getCategoryById(categoryId);
    return category;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;
    setError(axiosError.message || "Failed to fetch category");
    return null;
  } finally {
    setLoading(false);
  }
};


  const add = async (categoriesData: Omit<Category, "_id">) => {
    setAdding(true);
    setError(null);
    try {
      const createdCategories = await addCategorie(categoriesData);
      setNewCategories(createdCategories);
      setCategories(prev => [...prev, createdCategories]);
return createdCategories || null;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to add Categories");
    } finally {
      setAdding(false);
    }
  };

  const update = async (categoryId: string,updatedData: Partial<Category>) => {
  setUpdating(true);
  setError(null);
  try {
    const updatedCategory = await updateCategories(categoryId,updatedData);
    setCategories(prev =>
      prev.map(c => (c._id === updatedCategory._id ? updatedCategory : c))
    );
return updatedCategory || null;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;
    setError(axiosError.message || "Failed to update category");
  } finally {
    setUpdating(false);
  }
};

  const remove = async (categoryId: string) => {
  setRemoving(true);
  setError(null);
  try {
    await deleteCategory(categoryId);
    setCategories(prev => prev.filter(c => c._id !== categoryId));
    return true;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;
    setError(axiosError.message || "Failed to delete category");
  } finally {
    setRemoving(false);
  }
};


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    categories,
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
    newCategories,
  };
};

