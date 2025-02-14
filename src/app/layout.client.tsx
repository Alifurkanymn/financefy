'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBar from "./components/SideBar";
import { useAuthStore } from "@/lib/store/authStore";
import { ReactNode } from "react";

export default function RootLayoutClient({ children }: { children: ReactNode }) {
    const { user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    console.log(user)

    if (!user) {
        return null;
    }

    return (
        <div className="flex flex-col lg:flex-row p-4 gap-4 h-screen overflow-hidden">
            {user && <SideBar />}
            <div className="bg-white w-full rounded-lg shadow-xl overflow-y-auto p-6">
                {children}
            </div>
        </div>
    );
}
