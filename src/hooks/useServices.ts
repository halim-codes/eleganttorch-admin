import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import {
  fetchServices,
  addService,
  deleteService,
  updateService,
  getServiceById,
} from '../services/ServicesService';
import { Service } from '../types/Service';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchServices();
      setServices(res.data || []);
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to fetch services");
    } finally {
      setLoading(false);
    }
  }, []);

  const findOne = async (serviceId: string): Promise<Service | null> => {
    setLoading(true);
    setError(null);
    try {
      const service = await getServiceById(serviceId);
      return service;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to fetch service");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const add = async (serviceData: Omit<Service, "_id">) => {
    setAdding(true);
    setError(null);
    try {
      const newService = await addService(serviceData);
      setNewService(newService);
      setServices(prev => [...prev, newService]);
      return newService || null;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to add service");
    } finally {
      setAdding(false);
    }
  };

  const update = async (serviceId: string, updatedData: Partial<Service>) => {
    setUpdating(true);
    setError(null);
    try {
      const updated = await updateService(serviceId, updatedData);
      setServices(prev => prev.map(s => (s._id === updated._id ? updated : s)));
      return updated || null;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to update service");
    } finally {
      setUpdating(false);
    }
  };

  const remove = async (serviceId: string) => {
    setRemoving(true);
    setError(null);
    try {
      await deleteService(serviceId);
      setServices(prev => prev.filter(s => s._id !== serviceId));
      return true;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to delete service");
    } finally {
      setRemoving(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    services,
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
    newService,
  };
};
