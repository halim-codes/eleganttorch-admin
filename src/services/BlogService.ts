import api from '../lib/axios';
import { Blog } from '../types/Blog';
import { ApiResponse } from "../types/ApiResponse";

export const fetchBlogPosts = async (): Promise<ApiResponse<Blog[]>> => {
  const response = await api.get<ApiResponse<Blog[]>>("/blog");
  return response.data;
};

export const getBlogPostById = async (
  postId: string
): Promise<Blog> => {
  try {
    const response = await api.get<Blog>(`/blog/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting blog post:", error);
    throw error;
  }
};

export const addBlogPost = async (
  newPostData: Omit<Blog, '_id'> 
): Promise<Blog> => {
  const response = await api.post<Blog>('/blog', newPostData);
  return response.data;
};

export const updateBlogPost = async (
  id: string,
  updatedPostData: Partial<Blog>
): Promise<Blog> => {
  try {
    const response = await api.patch<Blog>(`/blog/${id}`, updatedPostData);
    return response.data;
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }
};

export const deleteBlogPost = async (
  postId: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/blog/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
};
