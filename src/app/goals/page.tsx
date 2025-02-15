'use client'
import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGoalStore } from '@/lib/store/useGoalStore';
import BigTableGoals from '../components/BigTableGoals';
import AddGoalDialog from '../components/Dialog/AddGoalDialog';
import { Goal } from 'lucide-react';

const Goals = () => {
    const { goals, fetchGoals, removeGoal } = useGoalStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchGoals();
    }, [fetchGoals]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredGoals = goals.filter((goal) =>
        goal.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(goals);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Goals');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'goals.xlsx');
    };

    const tableHeads = [
        'Başlık', 'Hedef Tutarı', 'Para Birimi', 'Kategori', 'Başlangıç Tarihi', 'Durum',
    ];

    return (
        <div className='p-4'>
            <h1 className="text-2xl text-black font-bold mb-3">Hedefler</h1>
            <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
                <div className='flex items-center justify-between'>
                    {filteredGoals.length !== 0 && (
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

            {filteredGoals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <Goal className="text-primaryColor" size={80} />
                    <p className="text-2xl mt-2 text-primaryColor">Henüz bir hedefiniz yok !</p>
                </div>
            ) : (
                <BigTableGoals
                    data={filteredGoals}
                    heads={tableHeads}
                    removeGoal={removeGoal}
                />
            )}

            <AddGoalDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
            />
        </div>
    );
};

export default Goals;
