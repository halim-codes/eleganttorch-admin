import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
};

const axiosInstance: AxiosInstance = axios.create(config);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
