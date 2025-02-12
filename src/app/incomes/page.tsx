'use client'
import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useIncomeStore } from "@/lib/store/useIncomeStore";
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

const Incomes = () => {
    const { incomes, addIncome, removeIncome, updateIncome, getIncome } = useIncomeStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIncome, setSelectedIncome] = useState(null);
    const tableHeads = [
        'Başlık', 'Tutar', 'Para Birimi', 'Kategori', 'Tarih', 'Açıklama', 'Tekrarlama Düzeni'
    ];

    const [newIncome, setNewIncome] = useState({
        title: '',
        amount: 0,
        currency: 'TRY',
        category: '',
        date: '',
        description: '',
        recurrence: 'Günlük',
    });

    const handleAddIncome = () => {
        addIncome(newIncome);
        setIsDialogOpen(false);
        setNewIncome({
            title: '',
            amount: 0,
            currency: 'TRY',
            category: '',
            date: '',
            description: '',
            recurrence: 'Günlük',
        });
    };

    const handleUpdateIncome = () => {
        if (selectedIncome) {
            updateIncome(selectedIncome.id, selectedIncome);
            setIsEditDialogOpen(false);
            setSelectedIncome(null);
        }
    }

    const openEditDialog = (income) => {
        setSelectedIncome(income);
        setIsEditDialogOpen(true);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredIncomes = incomes.filter((income) =>
        income.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(incomes);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Incomes');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'incomes.xlsx');
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
                data={filteredIncomes}
                heads={tableHeads}
                removeIncome={removeIncome}
                openEditDialog={openEditDialog}
            />

            {/* Add Dialog */}
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
                            type="number"
                            value={newIncome.amount}
                            onChange={(e) => setNewIncome({ ...newIncome, amount: parseFloat(e.target.value) || 0 })}
                        />
                        <Select
                            value={newIncome.currency}
                            onValueChange={(value) => setNewIncome({ ...newIncome, currency: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Para Birimi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="TRY">TRY</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                            </SelectContent>
                        </Select>
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
                                <SelectItem value="Günlük">Günlük</SelectItem>
                                <SelectItem value="Aylık">Aylık</SelectItem>
                                <SelectItem value="Yıllık">Yıllık</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button className='btn primary-btn' onClick={handleAddIncome}>Ekle</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yeni Gelir Ekle</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <Input
                            placeholder="Başlık"
                            value={selectedIncome?.title}
                            onChange={(e) => setSelectedIncome({ ...selectedIncome, title: e.target.value })}
                        />
                        <Input
                            placeholder="Tutar"
                            type="number"
                            value={selectedIncome?.amount}
                            onChange={(e) => setSelectedIncome({ ...selectedIncome, amount: parseFloat(e.target.value) || 0 })}
                        />
                        <Select
                            value={selectedIncome?.currency}
                            onValueChange={(value) => setSelectedIncome({ ...selectedIncome, currency: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Para Birimi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="TRY">TRY</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            placeholder="Kategori"
                            value={selectedIncome?.category}
                            onChange={(e) => setSelectedIncome({ ...selectedIncome, category: e.target.value })}
                        />
                        <Input
                            placeholder="Tarih"
                            type="date"
                            value={selectedIncome?.date}
                            onChange={(e) => setSelectedIncome({ ...selectedIncome, date: e.target.value })}
                        />
                        <Input
                            placeholder="Açıklama"
                            value={selectedIncome?.description}
                            onChange={(e) => setSelectedIncome({ ...selectedIncome, description: e.target.value })}
                        />

                        <Select
                            value={selectedIncome?.recurrence}
                            onValueChange={(value) => setSelectedIncome({ ...selectedIncome, recurrence: value })}
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
                        <Button className='btn primary-btn' onClick={handleUpdateIncome}>Ekle</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Incomes;
