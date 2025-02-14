'use client'

import React, { useState } from 'react'
import { HandCoins, DiamondPercent, ChartColumnDecreasing, House, Goal, Landmark, LogOut, MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
        <div className="min-w-[240px] lg:h-full items-center lg:items-start flex lg:flex-col justify-between lg:justify-normal bg-white shadow-xl p-4 pb-6 rounded-lg">
            <Link href='/' className="flex items-center gap-2 text-2xl font-bold text-center lg:py-4 lg:mb-4">
                <Image className='rounded-2xl hover:scale-105 transition-all duration-300' src="/logo-bg.svg" alt='logo-bg' width={60} height={60} />
                Financefy
            </Link>

            <div className="lg:hidden flex justify-start">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
                            <span className="sr-only">Open Sidebar</span>
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <SheetContent position="left" size="content">
                        <nav className="flex flex-col gap-2 mt-4">
                            <Link href='/' className="flex items-center gap-2 text-2xl font-bold text-center mb-10">
                                <Image className='rounded-2xl hover:scale-105 transition-all duration-300' src="/logo-bg.svg" alt='logo-bg' width={60} height={60} />
                                Financefy
                            </Link>
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
                    </SheetContent>
                </Sheet>
            </div>

            <div className="h-full hidden lg:flex flex-col justify-between">
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
    )
}

export default SideBar
