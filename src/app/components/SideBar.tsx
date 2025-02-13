import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { HandCoins, DiamondPercent, ChartColumnDecreasing, House, Goal, Landmark } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';

type Props = {}

const SideBar = (props: Props) => {
    return (
        <div className="min-w-60 w-auto h-full bg-white shadow-xl flex flex-col p-4 rounded-lg">
            <Link href='/' className="flex items-center gap-2 text-2xl font-bold text-center py-4 mb-4">
                <Image className='rounded-2xl hover:scale-105 transition-all duration-300' src="/logo-bg.svg" alt='logo-bg' width={60} height={60} />
                Financefy
            </Link>

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
        </div>
    )
}

export default SideBar

