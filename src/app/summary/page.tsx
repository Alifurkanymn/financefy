'use client'

import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIncomeStore } from '@/lib/store/useIncomeStore';
import { useExpenseStore } from '@/lib/store/useExpensesStore';
import { useGoalStore } from '@/lib/store/useGoalStore';
import TableSkeleton from '../components/TableSkeleton';
import { Goal } from 'react-feather'; // Assuming you're using this icon or similar
import { EqualApproximately } from 'lucide-react';

type Props = {}

const Summary = (props: Props) => {
    const { incomes, fetchIncomes } = useIncomeStore();
    const { expenses, fetchExpenses } = useExpenseStore();
    const { goals, fetchGoals } = useGoalStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchIncomes(), fetchExpenses(), fetchGoals()]);
            setLoading(false);
        };
        fetchData();
    }, [fetchIncomes, fetchExpenses, fetchGoals]);

    const renderEmptyMessage = (title: string) => {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <EqualApproximately className="text-gray-500" size={80} />
                <p className="text-2xl mt-2 text-gray-500">
                    {title} bulunmamaktadır.
                </p>
            </div>
        );
    };

    return (
        <div>
            <h1 className="text-2xl text-black font-bold mb-3">Özetler</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
                {["Gelirlerim", "Giderlerim", "Hedeflerim"].map((title, index) => (
                    <Card key={index} className="h-full w-full relative">
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <TableSkeleton />
                            ) : (
                                <>
                                    {title === "Gelirlerim" && (incomes.length === 0 ? renderEmptyMessage("Gelirler") : (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[150px]">Adı</TableHead>
                                                    <TableHead className="text-right">Tutar</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {incomes.map((item, i) => (
                                                    <TableRow key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                                                        <TableCell className="font-medium">{item.title}</TableCell>
                                                        <TableCell className="text-right">{item.amount} TL</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    ))}

                                    {title === "Giderlerim" && (expenses.length === 0 ? renderEmptyMessage("Giderler") : (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[150px]">Adı</TableHead>
                                                    <TableHead className="text-right">Tutar</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {expenses.map((item, i) => (
                                                    <TableRow key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                                                        <TableCell className="font-medium">{item.title}</TableCell>
                                                        <TableCell className="text-right">{item.amount} TL</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    ))}

                                    {title === "Hedeflerim" && (goals.length === 0 ? renderEmptyMessage("Hedefler") : (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[150px]">Adı</TableHead>
                                                    <TableHead className="text-right">Hedef Tutarı</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {goals.map((item, i) => (
                                                    <TableRow key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                                                        <TableCell className="font-medium">{item.title}</TableCell>
                                                        <TableCell className="text-right">{item.targetAmount} TL</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    ))}
                                </>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Summary;
