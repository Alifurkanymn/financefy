import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type BigTableProps = {
    data: any[];
    heads: string[];
    removeIncome: (id: string) => void;
    openEditDialog: (income: any) => void;
};

const BigTable = ({ data, heads, removeIncome, openEditDialog }: BigTableProps) => {
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
                {data?.map((income) => (
                    <TableRow key={income.id}>
                        <TableCell>{income.title}</TableCell>
                        <TableCell>{income.amount}</TableCell>
                        <TableCell>{income.currency}</TableCell>
                        <TableCell>{income.category}</TableCell>
                        <TableCell>{income.date}</TableCell>
                        <TableCell>{income.description}</TableCell>
                        <TableCell>{income.recurrence}</TableCell>
                        <TableCell>
                            <Button className="text-red-500" onClick={() => removeIncome(income.id)}>
                                Sil
                            </Button>
                            <Button className="text-red-500" onClick={() => openEditDialog(income)}>
                                Düzenle
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default BigTable;
