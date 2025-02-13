'use client'
import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGoalStore } from '@/lib/store/useGoalStore';

const Goals = () => {
    const { goals, addGoal, removeGoal, updateGoal, fetchGoals } = useGoalStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGoal, setSelectedGoal] = useState(null);

    const [newGoal, setNewGoal] = useState({
        title: '',
        targetAmount: 0,
        currency: 'TRY',
        startDate: '',
        endDate: '',
        currentSaving: 0,
        category: '',
        description: '',
        status: 'Active',
        recurrence: 'Günlük',
    });

    useEffect(() => {
        fetchGoals(); // Fetch goals on mount
    }, []);

    const handleAddGoal = () => {
        addGoal({ ...newGoal });
        setIsDialogOpen(false);
        setNewGoal({
            title: '',
            targetAmount: 0,
            currency: 'TRY',
            startDate: '',
            endDate: '',
            currentSaving: 0,
            category: '',
            description: '',
            status: 'Active',
            recurrence: 'Günlük',
        });
    };

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

    return (
        <div className='p-4'>
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
                        <TableHead>Para Birimi</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Başlangıç Tarihi</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead>Tekrarlama Düzeni</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredGoals.map((goal) => (
                        <TableRow key={goal.id}>
                            <TableCell>{goal.title}</TableCell>
                            <TableCell>{goal.targetAmount}</TableCell>
                            <TableCell>{goal.currency}</TableCell>
                            <TableCell>{goal.category}</TableCell>
                            <TableCell>{goal.startDate}</TableCell>
                            <TableCell>{goal.status}</TableCell>
                            <TableCell>{goal.recurrence}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yeni Hedef Ekle</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <Input
                            placeholder="Başlık"
                            value={newGoal.title}
                            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                        />
                        <Input
                            placeholder="Hedef Tutarı"
                            type="number"
                            value={newGoal.targetAmount}
                            onChange={(e) => setNewGoal({ ...newGoal, targetAmount: parseFloat(e.target.value) })}
                        />
                        <Select
                            value={newGoal.currency}
                            onValueChange={(value) => setNewGoal({ ...newGoal, currency: value })}
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
                            value={newGoal.category}
                            onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                        />
                        <Input
                            placeholder="Başlangıç Tarihi"
                            type="date"
                            value={newGoal.startDate}
                            onChange={(e) => setNewGoal({ ...newGoal, startDate: e.target.value })}
                        />
                        <Input
                            placeholder="Açıklama"
                            value={newGoal.description}
                            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                        />
                        <Select
                            value={newGoal.recurrence}
                            onValueChange={(value) => setNewGoal({ ...newGoal, recurrence: value })}
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
                        <Button className='btn primary-btn' onClick={handleAddGoal}>Ekle</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Goals;
