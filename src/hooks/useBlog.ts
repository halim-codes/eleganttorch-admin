import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import {
  fetchBlogPosts,
  addBlogPost,
  deleteBlogPost,
  updateBlogPost,
  getBlogPostById,
} from '../services/BlogService';
import { Blog } from '../types/Blog';

export const useBlog = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [newPost, setNewPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const blogResponse = await fetchBlogPosts();
      setPosts(blogResponse.data || []);
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

  const findOne = async (postId: string): Promise<Blog | null> => {
    setLoading(true);
    setError(null);
    try {
      const post = await getBlogPostById(postId);
      return post;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to fetch blog post");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const add = async (postData: Omit<Blog, "_id">) => {
    setAdding(true);
    setError(null);
    try {
      const createdPost = await addBlogPost(postData);
      setNewPost(createdPost);
      setPosts(prev => [...prev, createdPost]);
      return createdPost || null;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to add blog post");
    } finally {
      setAdding(false);
    }
  };

  const update = async (postId: string, updatedData: Partial<Blog>) => {
    setUpdating(true);
    setError(null);
    try {
      const updatedPost = await updateBlogPost(postId, updatedData);
      setPosts(prev =>
        prev.map(p => (p._id === updatedPost._id ? updatedPost : p))
      );
      return updatedPost || null;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to update blog post");
    } finally {
      setUpdating(false);
    }
  };

  const remove = async (postId: string) => {
    setRemoving(true);
    setError(null);
    try {
      await deleteBlogPost(postId);
      setPosts(prev => prev.filter(p => p._id !== postId));
      return true;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to delete blog post");
    } finally {
      setRemoving(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    posts,
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
    newPost,
  };
};
