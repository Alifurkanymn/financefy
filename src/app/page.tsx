'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CoinsIcon, EqualApproximately, Goal, HandCoins, Landmark, Wallet } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIncomeStore } from "@/lib/store/useIncomeStore";
import { useExpenseStore } from "@/lib/store/useExpensesStore";
import { useGoalStore } from "@/lib/store/useGoalStore";
import Link from "next/link";
import TableSkeleton from "./components/TableSkeleton";
import QuickTransactioons from "./components/QuickTransactioons";
import TotalMoney from "./components/TotalMoney";

export default function Home() {
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

  const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const netTotal = totalIncome - totalExpenses;

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
    <div className="flex flex-col w-full gap-6">
      {/* Hızlı İşlemler */}
      <QuickTransactioons />
      <hr />

      {/* Tablo Özetleri */}
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

      {/* Varlıklarım */}
      <TotalMoney netTotal={netTotal} />
    </div>
  );
}
