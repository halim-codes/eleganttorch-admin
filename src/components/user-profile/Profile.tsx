"use client";
import { useEffect, useState } from "react";

import { useLocale } from "@/context/LocaleContext";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types/User';

export default function ProfilePage() {
    const { messages } = useLocale();
    const { fetchCurrentUser, loading, error } = useAuth();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const data = await fetchCurrentUser();
            if (data) setUser(data);
        };

        getUser();
    }, []);

    return (
        <>
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                {messages["p_profile"] || "Profile"}
            </h3>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && user && (
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                    <div className="space-y-6">
                        <UserMetaCard user={user} />
                        <UserInfoCard user={user} />
                    </div>
                </div>
            )}
        </>
    );
}
