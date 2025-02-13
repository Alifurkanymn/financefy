'use client'
import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BigTable from '../components/BigTable';
import { useExpenseStore } from '@/lib/store/useExpensesStore';

const Expenses = () => {
    const { expenses, addExpense, fetchExpenses, removeExpense, updateExpense, getExpense } = useExpenseStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedExpense, setSelectedExpense] = useState(null);
    const tableHeads = [
        'Başlık', 'Tutar', 'Kategori', 'Tarih', 'Açıklama', 'Tekrarlama Düzeni'
    ];

    const [newExpense, setNewExpense] = useState({
        title: '',
        amount: 0,
        category: '',
        date: '',
        description: '',
        recurrence: 'Günlük',
    });

    const handleAddExpense = () => {
        addExpense(newExpense);
        setIsDialogOpen(false);
        setNewExpense({
            title: '',
            amount: 0,
            category: '',
            date: '',
            description: '',
            recurrence: 'Günlük',
        });
    };

    const handleUpdateExpense = () => {
        if (selectedExpense) {
            updateExpense(selectedExpense.id, selectedExpense);
            setIsEditDialogOpen(false);
            setSelectedExpense(null);
        }
    }

    useEffect(() => {
        fetchExpenses();
    }, []);

    const openEditDialog = (expense) => {
        setSelectedExpense(expense);
        setIsEditDialogOpen(true);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredExpenses = expenses.filter((expense) =>
        expense.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(expenses);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'expenses.xlsx');
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

            <BigTable
                data={filteredExpenses}
                heads={tableHeads}
                removeFunction={removeExpense}
                openEditDialog={openEditDialog}
            />

            {/* Add Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yeni Gider Ekle</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <Input
                            placeholder="Başlık"
                            value={newExpense.title}
                            onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                        />
                        <Input
                            placeholder="Tutar"
                            type="number"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
                        />
                        <Input
                            placeholder="Kategori"
                            value={newExpense.category}
                            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                        />
                        <Input
                            placeholder="Tarih"
                            type="date"
                            value={newExpense.date}
                            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                        />
                        <Input
                            placeholder="Açıklama"
                            value={newExpense.description}
                            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                        />

                        <Select
                            value={newExpense.recurrence}
                            onValueChange={(value) => setNewExpense({ ...newExpense, recurrence: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Tekrarlama Düzeni" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Günlük">Günlük</SelectItem>
                                <SelectItem value="Aylık">Aylık</SelectItem>
                                <SelectItem value="Yıllık">Yıllık</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button className='btn primary-btn' onClick={handleAddExpense}>Ekle</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Gelir Güncelle</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <Input
                            placeholder="Başlık"
                            value={selectedExpense?.title}
                            onChange={(e) => setSelectedExpense({ ...selectedExpense, title: e.target.value })}
                        />
                        <Input
                            placeholder="Tutar"
                            type="number"
                            value={selectedExpense?.amount}
                            onChange={(e) => setSelectedExpense({ ...selectedExpense, amount: parseFloat(e.target.value) || 0 })}
                        />
                        <Input
                            placeholder="Kategori"
                            value={selectedExpense?.category}
                            onChange={(e) => setSelectedExpense({ ...selectedExpense, category: e.target.value })}
                        />
                        <Input
                            placeholder="Tarih"
                            type="date"
                            value={selectedExpense?.date}
                            onChange={(e) => setSelectedExpense({ ...selectedExpense, date: e.target.value })}
                        />
                        <Input
                            placeholder="Açıklama"
                            value={selectedExpense?.description}
                            onChange={(e) => setSelectedExpense({ ...selectedExpense, description: e.target.value })}
                        />

                        <Select
                            value={selectedExpense?.recurrence}
                            onValueChange={(value) => setSelectedExpense({ ...selectedExpense, recurrence: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Tekrarlama Düzeni" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Günlük">Günlük</SelectItem>
                                <SelectItem value="Aylık">Aylık</SelectItem>
                                <SelectItem value="Yıllık">Yıllık</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button className='btn primary-btn' onClick={handleUpdateExpense}>Güncelle</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Expenses;
