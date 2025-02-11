'use client'
import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Income = {
    id: number;
    title: string;
    amount: number;
    category: string;
    date: string;
    description: string;
    recurrence: string;
};

const Expenses = () => {
    const [Expenses, setExpenses] = useState < Income[] > ([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newIncome, setNewIncome] = useState < Income > ({
        id: 0,
        title: '',
        amount: 0,
        category: '',
        date: '',
        description: '',
        recurrence: '',
    });

    const handleAddIncome = () => {
        setExpenses([...Expenses, { ...newIncome, id: Expenses.length + 1 }]);
        setIsDialogOpen(false);
        setNewIncome({
            id: 0,
            title: '',
            amount: 0,
            category: '',
            date: '',
            description: '',
            recurrence: '',
        });
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredExpenses = Expenses.filter((income) =>
        income.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(Expenses);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Expenses.xlsx');
    };

    return (
        <div className="p-4">
            <div className="flex justify-between gap-4 mb-4">
                <Button className='btn primary-btn !w-auto !min-w-44' onClick={exportToExcel}>Excel İndir</Button>
                <Input
                    type="text"
                    placeholder="Ara..."
                    className='h-12'
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <Button className='btn primary-btn !w-auto !min-w-44' onClick={() => setIsDialogOpen(true)}>Ekle</Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Başlık</TableHead>
                        <TableHead>Tutar</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Tarih</TableHead>
                        <TableHead>Açıklama</TableHead>
                        <TableHead>Tekrarlama Düzeni</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredExpenses.map((income) => (
                        <TableRow key={income.id}>
                            <TableCell>{income.title}</TableCell>
                            <TableCell>{income.amount}</TableCell>
                            <TableCell>{income.category}</TableCell>
                            <TableCell>{income.date}</TableCell>
                            <TableCell>{income.description}</TableCell>
                            <TableCell>{income.recurrence}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yeni Gelir Ekle</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <Input
                            placeholder="Başlık"
                            value={newIncome.title}
                            onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })}
                        />
                        <Input
                            placeholder="Tutar"
                            type="string"
                            value={newIncome.amount}
                            onChange={(e) => setNewIncome({ ...newIncome, amount: parseFloat(e.target.value) })}
                        />
                        <Input
                            placeholder="Kategori"
                            value={newIncome.category}
                            onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
                        />
                        <Input
                            placeholder="Tarih"
                            type="date"
                            value={newIncome.date}
                            onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
                        />
                        <Input
                            placeholder="Açıklama"
                            value={newIncome.description}
                            onChange={(e) => setNewIncome({ ...newIncome, description: e.target.value })}
                        />

                        <Select
                            value={newIncome.recurrence}
                            onValueChange={(value) => setNewIncome({ ...newIncome, recurrence: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Tekrarlama Düzeni" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="günlük">Günlük</SelectItem>
                                <SelectItem value="aylık">Aylık</SelectItem>
                                <SelectItem value="yıllık">Yıllık</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button className='btn primary-btn' onClick={handleAddIncome}>Ekle</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Expenses;
