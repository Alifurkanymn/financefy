import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type BigTableGoalsProps = {
    data: unknown[];
    heads: string[];
    removeGoal: (id: string) => void;
};

const BigTableGoals = ({ data, heads, removeGoal }: BigTableGoalsProps) => {
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
                {data?.map((goal) => (
                    <TableRow key={goal.id}>
                        <TableCell>{goal.title}</TableCell>
                        <TableCell>{formatAmount(goal.targetAmount)}</TableCell>
                        <TableCell>{goal.currency}</TableCell>
                        <TableCell>{goal.category}</TableCell>
                        <TableCell>{formatDate(goal.startDate)}</TableCell>
                        <TableCell>{goal.status}</TableCell>
                        <TableCell>
                            <div className="w-full flex items-center gap-4">
                                <Button
                                    className="btn primary-btn !min-w-20 !w-auto text-white"
                                    onClick={() => removeGoal(goal.id)}
                                >
                                    Sil
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default BigTableGoals;
