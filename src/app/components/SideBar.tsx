'use client'

import React, { useState } from 'react'
import { HandCoins, DiamondPercent, ChartColumnDecreasing, House, Goal, Landmark, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, MenuItem } from "@/components/ui/menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Props = {}

const SideBar = (props: Props) => {
    const { logout } = useAuthStore()
    const router = useRouter()

    const handleLogOut = async () => {
        await logout()
        router.push("/login")
    }

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="min-w-auto md:min-w-[240px] w-full h-full bg-white shadow-xl flex flex-col justify-between p-4 pb-6 rounded-lg">
            <div>
                <Link href='/' className="flex items-center gap-2 text-2xl font-bold text-center py-4 mb-4">
                    <Image className='rounded-2xl hover:scale-105 transition-all duration-300' src="/logo-bg.svg" alt='logo-bg' width={60} height={60} />
                    Financefy
                </Link>

                <div className="md:hidden flex justify-end">
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
                                <span className="sr-only">Open Sidebar</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="w-full max-w-xs p-4">
                            <nav className="flex flex-col gap-2">
                                <Link href='/' className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                                    <House className="text-primaryColor" />
                                    <span>Anasayfa</span>
                                </Link>

                                <div className="px-4 text-sm font-semibold text-primaryColor mt-4">
                                    <span>Genel Bakış</span>
                                </div>
                                <Link href="/summary" className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition mt-1">
                                    <DiamondPercent className="text-yellow-500" />
                                    Özetler
                                </Link>

                                <div className="px-4 text-sm font-semibold text-primaryColor mt-4">
                                    <span>Yönetim</span>
                                </div>
                                <Link href="/incomes" className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition mt-1">
                                    <HandCoins className="text-green-500" />
                                    Gelirler
                                </Link>
                                <Link href="/expenses" className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                                    <Landmark className="text-teal-500" />
                                    Giderler
                                </Link>
                                <Link href="/goals" className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                                    <Goal className="text-purple-500" />
                                    Hedefler
                                </Link>
                            </nav>

                            <div className='flex flex-col items-start mt-4'>
                                <button onClick={handleLogOut} className="flex items-center gap-2 px-4 py-1 text-base w-full text-red-500 hover:bg-gray-100 rounded-lg transition">
                                    <LogOut className="text-red-500" />
                                    Çıkış Yap
                                </button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="hidden md:block">
                    <nav className="flex flex-col gap-2">
                        <Link href='/' className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                            <House className="text-primaryColor" />
                            <span>Anasayfa</span>
                        </Link>

                        <div className="px-4 text-sm font-semibold text-primaryColor mt-4">
                            <span>Genel Bakış</span>
                        </div>
                        <Link href="/summary" className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition mt-1">
                            <DiamondPercent className="text-yellow-500" />
                            Özetler
                        </Link>

                        <div className="px-4 text-sm font-semibold text-primaryColor mt-4">
                            <span>Yönetim</span>
                        </div>
                        <Link href="/incomes" className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition mt-1">
                            <HandCoins className="text-green-500" />
                            Gelirler
                        </Link>
                        <Link href="/expenses" className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                            <Landmark className="text-teal-500" />
                            Giderler
                        </Link>
                        <Link href="/goals" className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                            <Goal className="text-purple-500" />
                            Hedefler
                        </Link>
                    </nav>

                    <div className='flex flex-col items-start mt-4'>
                        <button onClick={handleLogOut} className="flex items-center gap-2 px-4 py-1 text-base w-full text-red-500 hover:bg-gray-100 rounded-lg transition">
                            <LogOut className="text-red-500" />
                            Çıkış Yap
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
