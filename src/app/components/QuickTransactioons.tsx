import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Goal, HandCoins, Landmark } from "lucide-react";
import Link from "next/link";


const QuickTransactioons = () => {
    return (
        <div className="quick-transactions">
            <h1 className="text-2xl text-black font-bold mb-3">Hızlı İşlemler</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="w-full relative hover:scale-105 transition-all duration-300">
                    <CardHeader className="flex flex-row gap-4">
                        <HandCoins className="text-green-500" size={48} />
                        <div className="!mt-0">
                            <CardTitle className="text-xl">Gelir Ekle</CardTitle>
                            <CardDescription>Yeni bir gelir kaydı oluşturun.</CardDescription>
                            <Link href="/incomes" className="absolute inset-0"></Link>
                        </div>
                    </CardHeader>
                </Card>

                <Card className="w-full relative hover:scale-105 transition-all duration-300">
                    <CardHeader className="flex flex-row gap-4">
                        <Landmark className="text-teal-500" size={48} />
                        <div className="!mt-0">
                            <CardTitle className="text-xl">Gider Ekle</CardTitle>
                            <CardDescription>Yeni bir gider ekleyin ve harcamalarınızı takip edin.</CardDescription>
                            <Link href="/expenses" className="absolute inset-0"></Link>
                        </div>
                    </CardHeader>
                </Card>

                <Card className="w-full relative hover:scale-105 transition-all duration-300">
                    <CardHeader className="flex flex-row gap-4">
                        <Goal className="text-purple-500" size={48} />
                        <div className="!mt-0">
                            <CardTitle className="text-xl">Hedef Ekle</CardTitle>
                            <CardDescription>Finansal hedeflerinizi belirleyin ve takip edin.</CardDescription>
                            <Link href="/goals" className="absolute inset-0"></Link>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}

export default QuickTransactioons