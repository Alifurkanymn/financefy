'use client'
import React, { useEffect, useState } from 'react';
import { useIncomeStore } from "@/lib/store/useIncomeStore";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddIncomeDialog from '../components/Dialog/AddIncomeDialog';
import EditIncomeDialog from '../components/Dialog/EditIncomeDialog';
import { EqualApproximately } from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import BigTableIncome from '../components/BigTableIncome';
import { Income } from '@/app/types/types';

const Incomes = () => {
    const { incomes, addIncome, fetchIncomes, removeIncome, updateIncome } = useIncomeStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState < Income | null > (null);

    const tableHeads = [
        'Başlık', 'Tutar', 'Para Birimi', 'Kategori', 'Tarih', 'Açıklama', 'Tekrarlama Düzeni'
    ];

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredIncomes = incomes.filter((income) =>
        income.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchIncomes();
    }, [fetchIncomes]);

    const openEditDialog = (income: Income) => {
        setSelectedIncome(income);
        setIsEditDialogOpen(true);
    };

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
            <h1 className="text-2xl text-black font-bold mb-3">Gelirler</h1>
            <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
                <div className='flex items-center justify-between'>
                    {filteredIncomes.length !== 0 && (
                        <Button className='btn primary-btn !w-auto lg:!min-w-44' onClick={exportToExcel}>Excel İndir</Button>
                    )}
                    <Button className='btn primary-btn !w-auto block lg:hidden' onClick={() => setIsDialogOpen(true)}>Ekle</Button>
                </div>
                <Input
                    type="text"
                    placeholder="Ara..."
                    className='h-12'
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <Button className='btn primary-btn !w-auto !min-w-44 hidden lg:block' onClick={() => setIsDialogOpen(true)}>Ekle</Button>
            </div>

            {filteredIncomes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <EqualApproximately className="text-primaryColor" size={80} />
                    <p className="text-2xl mt-2 text-primaryColor">Henüz bir geliriniz yok !</p>
                </div>
            ) : (
                <BigTableIncome
                    data={filteredIncomes}
                    heads={tableHeads}
                    removeFunction={removeIncome}
                    openEditDialog={openEditDialog}
                />
            )}

            <AddIncomeDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                addIncome={addIncome}
            />

            <EditIncomeDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                income={selectedIncome}
                updateIncome={updateIncome}
            />
        </div>
    );
};

export default Incomes;
