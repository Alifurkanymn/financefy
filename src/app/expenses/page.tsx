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

type Expenses = {
    id: number;
    title: string;
    amount: number;
    category: string;
    date: string;
    description: string;
    recurrence: string;
};

const Expenses = () => {
    const [expenses, setExpenses] = useState < Expenses[] > ([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newExpenses, setNewExpenses] = useState < Expenses > ({
        id: 0,
        title: '',
        amount: 0,
        category: '',
        date: '',
        description: '',
        recurrence: '',
    });

    const handleAddExpenses = () => {
        setExpenses([...expenses, { ...newExpenses, id: expenses.length + 1 }]);
        setIsDialogOpen(false);
        setNewExpenses({
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

    const filteredExpenses = expenses.filter((income) =>
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
                    {filteredExpenses.map((expenses) => (
                        <TableRow key={expenses.id}>
                            <TableCell>{expenses.title}</TableCell>
                            <TableCell>{expenses.amount}</TableCell>
                            <TableCell>{expenses.category}</TableCell>
                            <TableCell>{expenses.date}</TableCell>
                            <TableCell>{expenses.description}</TableCell>
                            <TableCell>{expenses.recurrence}</TableCell>
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
                            value={newExpenses.title}
                            onChange={(e) => setNewExpenses({ ...newExpenses, title: e.target.value })}
                        />
                        <Input
                            placeholder="Tutar"
                            type="string"
                            value={newExpenses.amount}
                            onChange={(e) => setNewExpenses({ ...newExpenses, amount: parseFloat(e.target.value) })}
                        />
                        <Input
                            placeholder="Kategori"
                            value={newExpenses.category}
                            onChange={(e) => setNewExpenses({ ...newExpenses, category: e.target.value })}
                        />
                        <Input
                            placeholder="Tarih"
                            type="date"
                            value={newExpenses.date}
                            onChange={(e) => setNewExpenses({ ...newExpenses, date: e.target.value })}
                        />
                        <Input
                            placeholder="Açıklama"
                            value={newExpenses.description}
                            onChange={(e) => setNewExpenses({ ...newExpenses, description: e.target.value })}
                        />

                        <Select
                            value={newExpenses.recurrence}
                            onValueChange={(value) => setNewExpenses({ ...newExpenses, recurrence: value })}
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
                        <Button className='btn primary-btn' onClick={handleAddExpenses}>Ekle</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Expenses;
