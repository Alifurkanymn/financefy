"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import SideBar from "./components/SideBar";
import { auth } from "@/lib/services/firebase";
import Loading from "./components/Loading";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const { user, loading, setUser } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, [setUser]);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, router, pathname, loading]);

    if (loading && pathname !== "/login") return <Loading />;

    return (
        <div className="flex h-screen">
            <div className={`flex ${user ? "p-4" : ""} gap-4 h-screen overflow-hidden w-full`}>
                {user && <SideBar />}
                <main className={`bg-white w-full rounded-lg shadow-xl overflow-y-auto ${user ? "p-6" : ""}`}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AuthWrapper;
