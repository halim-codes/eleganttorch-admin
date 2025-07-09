'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/User';
import { updateUser as updateUserService } from '@/services/userService';
import { authService } from "@/services/authService";

interface UserContextType {
    user: User | null;
    loading: boolean;
    updateUser: (updatedUserData: Partial<User>) => Promise<void>;
}

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    updateUser: async () => { },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        authService.fetchCurrentUser()
            .then((data) => setUser(data))
            .catch((err) => console.error('Failed to fetch user', err))
            .finally(() => setLoading(false));
    }, []);

    const updateUser = async (updatedUserData: Partial<User>) => {
        try {
            const updated = await updateUserService(updatedUserData);
            setUser(updated);
        } catch (error) {
            console.error('Failed to update user', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, loading, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
