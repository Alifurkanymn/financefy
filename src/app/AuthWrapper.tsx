"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import SideBar from "./components/SideBar";
import { auth } from "@/lib/services/firebase";
import Loading from "./components/Loading";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const { user, loading, setUser } = useAuthStore();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        });

        return () => unsubscribe();
    }, [setUser]);

    if (loading) return <Loading />;

    return (
        <div className="flex h-screen">
            <div className="flex p-4 gap-4 h-screen overflow-hidden w-full">
                {user && <SideBar />}
                <main className="bg-white w-full rounded-lg shadow-xl overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AuthWrapper;
