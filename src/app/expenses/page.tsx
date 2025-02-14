'use client'

import { useState, useEffect } from 'react';
import { useExpenseStore } from '@/lib/store/useExpensesStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BigTable from '../components/BigTable';
import AddExpenseDialog from '../components/Dialog/AddExpenseDialog';
import EditExpenseDialog from '../components/Dialog/EditExpenseDialog';
import { EqualApproximately } from 'lucide-react';

const Expenses = () => {
    const { expenses, addExpense, fetchExpenses, removeExpense, updateExpense } = useExpenseStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const tableHeads = [
        'Başlık', 'Tutar', 'Para Birimi', 'Kategori', 'Tarih', 'Açıklama', 'Tekrarlama Düzeni'
    ];
    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredExpenses = expenses.filter((expense) =>
        expense.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openEditDialog = (expense) => {
        setSelectedExpense(expense);
        setIsEditDialogOpen(true);
    };

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
                {filteredExpenses.length !== 0 && (
                    <Button className='btn primary-btn !w-auto !min-w-44' onClick={exportToExcel}>Excel İndir</Button>
                )}
                <Input
                    type="text"
                    placeholder="Ara..."
                    className='h-12'
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <Button className='btn primary-btn !w-auto !min-w-44' onClick={() => setIsDialogOpen(true)}>Ekle</Button>
            </div>

            {filteredExpenses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <EqualApproximately className="text-primaryColor" size={80} />

                    <p className="text-2xl mt-2 text-primaryColor">Henüz bir gideriniz yok !</p>
                </div>
            ) : (
                <BigTable
                    data={filteredExpenses}
                    heads={tableHeads}
                    removeFunction={removeExpense}
                    openEditDialog={openEditDialog}
                />
            )}

            <AddExpenseDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                addExpense={addExpense}
            />

            <EditExpenseDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                selectedExpense={selectedExpense}
                updateExpense={updateExpense}
            />
        </div>
    );
};

export default Expenses;
