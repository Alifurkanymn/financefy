'use client'

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CoinsIcon, Goal, HandCoins, Landmark, Wallet } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIncomeStore } from "@/lib/store/useIncomeStore";
import { useExpenseStore } from "@/lib/store/useExpensesStore";
import { useGoalStore } from "@/lib/store/useGoalStore";
import Link from "next/link";

export default function Home() {
  const { incomes, fetchIncomes } = useIncomeStore();
  const { expenses, fetchExpenses } = useExpenseStore();
  const { goals, fetchGoals } = useGoalStore();

  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
    fetchGoals();
  }, [fetchIncomes, fetchExpenses, fetchGoals]);

  const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const netTotal = totalIncome - totalExpenses;

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Hızlı İşlemler */}
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
      <hr />

      {/* Tablo Özetleri */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
        {["Gelirlerim", "Giderlerim", "Hedeflerim"].map((title, index) => (
          <Card key={index} className="h-full w-full relative">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Adı</TableHead>
                    <TableHead className="text-right">Tutar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {title === "Gelirlerim" &&
                    incomes.map((item, i) => (
                      <TableRow key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell className="text-right">{item.amount} TL</TableCell>
                      </TableRow>
                    ))}
                  {title === "Giderlerim" &&
                    expenses.map((item, i) => (
                      <TableRow key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell className="text-right">{item.amount} TL</TableCell>
                      </TableRow>
                    ))}
                  {title === "Hedeflerim" &&
                    goals.map((item, i) => (
                      <TableRow key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell className="text-right">{item.targetAmount} TL</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Varlıklarım */}
      <div className="total w-full flex flex-col items-end">
        <Card className="bg-green-600 w-max">
          <CardHeader className="flex flex-row items-center gap-4">
            <Wallet className="text-white" size={48} />
            <div className="!mt-0">
              <CardTitle className="text-xl text-white">{netTotal} TL</CardTitle>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
