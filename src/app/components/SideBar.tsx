import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FaChartPie, FaCog, FaHome, FaMoneyBill } from 'react-icons/fa'
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { GrDocumentStore } from "react-icons/gr";
import { BsGraphUp } from "react-icons/bs";
import { GoGoal } from "react-icons/go";
import Image from 'next/image'

type Props = {}

const SideBar = (props: Props) => {
    return (
        <div className="min-w-60 w-auto h-full bg-white shadow-xl flex flex-col p-4 rounded-lg">
            <a href='/' className="flex items-center gap-2 text-2xl font-bold text-center py-4 mb-4">
                <Image className='rounded-2xl hover:scale-105 transition-all duration-300' src="/logo-bg.svg" alt='logo-bg' width={60} height={60} />
                Financefy
            </a>

            <nav className="flex flex-col gap-2">
                <a href="#" className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                    <FaHome className="text-lg text-primaryColor" />
                    <span>Anasayfa</span>
                </a>

                <div className="px-4 text-sm font-semibold text-primaryColor mt-4">
                    <span>Genel Bakış</span>
                </div>
                <a href="#" className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition mt-1">
                    <GrDocumentStore className="text-lg text-yellow-500" />
                    Özetler
                </a>
                <a href="#" className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                    <BsGraphUp className="text-lg text-red-500" />
                    Grafikler
                </a>

                <div className="px-4 text-sm font-semibold text-primaryColor mt-4">
                    <span>Yönetim</span>
                </div>
                <a href="#" className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition mt-1">
                    <FaMoneyBill className="text-lg text-green-500" />
                    Gelirler
                </a>
                <a href="#" className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                    <FaMoneyBillTransfer className="text-lg text-teal-500" />
                    Giderler
                </a>
                <a href="#" className="flex items-center gap-2 px-4 py-1 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                    <GoGoal className="text-lg text-purple-500" />
                    Hedefler
                </a>
            </nav>
        </div>
    )
}

export default SideBar

