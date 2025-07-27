import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import { fetchProducts, getProductById, addProduct, updateProducts, deleteProducts } from '../services/ProductsService';
import { Product } from '@/types/Product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [newProducts, setNewProducts] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [updating, setUpdating] = useState(false);


  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const products = await fetchProducts();
      setProducts(products.data || []);
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

  const findOne = async (productId: string): Promise<Product | null> => {
    setLoading(true);
    setError(null);
    try {
      const product = await getProductById(productId);
      return product;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to fetch product");
      return null;
    } finally {
      setLoading(false);
    }
  };


  const add = async (productsData: Omit<Product, "_id">) => {
    setAdding(true);
    setError(null);
    try {
      const createdProducts = await addProduct(productsData);
      setNewProducts(createdProducts);
      setProducts(prev => [...prev, createdProducts]);
      return createdProducts || null;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to add Products");
    } finally {
      setAdding(false);
    }
  };

  const update = async (productId: string, updatedData: Partial<Product>) => {
    setUpdating(true);
    setError(null);
    try {
      const updatedProduct = await updateProducts(productId, updatedData);
      setProducts(prev =>
        prev.map(c => (c._id === updatedProduct._id ? updatedProduct : c))
      );
      return updatedProduct || null;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to update product");
    } finally {
      setUpdating(false);
    }
  };

  const remove = async (productId: string) => {
    setRemoving(true);
    setError(null);
    try {
      await deleteProducts(productId);
      setProducts(prev => prev.filter(c => c._id !== productId));
      return true;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to delete product");
    } finally {
      setRemoving(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    products,
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
    newProducts,
  };
};

