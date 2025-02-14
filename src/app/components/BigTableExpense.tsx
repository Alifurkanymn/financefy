import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Expense } from '@/app/types/types';

type BigTableExpenseProps = {
    data: Expense[];
    heads: string[];
    removeFunction: (id: string) => void;
    openEditDialog: (expense: Expense) => void;
};

const BigTableExpense = ({ data, heads, removeFunction, openEditDialog }: BigTableExpenseProps) => {
    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };
    const formatDate = (date: string) => {
        const parsedDate = new Date(date);
        return new Intl.DateTimeFormat('tr-TR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(parsedDate).replace(/\./g, '.');
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {heads.map((head, index) => (
                        <TableHead key={index}>{head}</TableHead>
                    ))}
                    {data?.length !== 0 && <TableHead>Düzenle</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((transaction) => (
                    <TableRow key={transaction.id}>
                        <TableCell>{transaction.title}</TableCell>
                        <TableCell>{formatAmount(transaction.amount)}</TableCell>
                        <TableCell>{transaction.currency}</TableCell>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.recurrence}</TableCell>
                        <TableCell>
                            <div className="w-full flex items-center gap-4">
                                <Button className="btn primary-btn !min-w-20 !w-auto text-white" onClick={() => removeFunction(transaction.id)}>
                                    Sil
                                </Button>
                                <Button className="btn !w-auto secondary-btn text-primaryColor" onClick={() => openEditDialog(transaction)}>
                                    Düzenle
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default BigTableExpense;
