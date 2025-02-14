import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type BigTableProps = {
    data: unknown[];
    heads: string[];
    removeFunction: (id: string) => void;
    openEditDialog: (income: unknown) => void;
};

const BigTable = ({ data, heads, removeFunction, openEditDialog }: BigTableProps) => {
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
                {data?.map((element) => (
                    <TableRow key={element.id}>
                        <TableCell>{element.title}</TableCell>
                        <TableCell>{formatAmount(element.amount)}</TableCell>
                        <TableCell>{element.currency}</TableCell>
                        <TableCell>{element.category}</TableCell>
                        <TableCell>{formatDate(element.date)}</TableCell>
                        <TableCell>{element.description}</TableCell>
                        <TableCell>{element.recurrence}</TableCell>
                        <TableCell>
                            <div className='w-full flex items-center gap-4'>
                                <Button className="btn primary-btn !min-w-20 !w-auto text-white" onClick={() => removeFunction(element.id)}>
                                    Sil
                                </Button>
                                <Button className="btn !w-auto secondary-btn text-primaryColor" onClick={() => openEditDialog(element)}>
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

export default BigTable;
