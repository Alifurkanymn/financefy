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

type Goals = {
    id: number;
    title: string;
    targetAmount: number;
    currency: string,
    startDate: string,
    endDate: string,
    currentSaving: number,
    category: string;
    description: string;
    status: string;
};

const Goals = (props: Props) => {
    const [goals, setGoals] = useState < Goals[] > ([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newGoal, setNewGoal] = useState < Goals > ({
        id: 0,
        title: '',
        targetAmount: 0,
        currency: '',
        startDate: '',
        endDate: '',
        currentSaving: 0,
        category: '',
        description: '',
        status: '',
    })

    const handleAddGoal = () => {
        setGoals([...goals, { ...newGoal, id: goals.length + 1 }]);
        setIsDialogOpen(false);
        setNewGoal({
            id: 0,
            title: '',
            targetAmount: 0,
            currency: '',
            startDate: '',
            endDate: '',
            currentSaving: 0,
            category: '',
            description: '',
            status: '',
        });
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


    const filteredGoals = goals.filter((goal) =>
        goal.title.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <TableHead>Tarih</TableHead>
                        <TableHead>Açıklama</TableHead>
                        <TableHead>Tekrarlama Düzeni</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredGoals.map((goal) => (
                        <TableRow key={goal.id}>
                            <TableCell>{goal.title}</TableCell>
                            <TableCell>{goal.amount}</TableCell>
                            <TableCell>{goal.currency}</TableCell>
                            <TableCell>{goal.category}</TableCell>
                            <TableCell>{goal.date}</TableCell>
                            <TableCell>{goal.description}</TableCell>
                            <TableCell>{goal.recurrence}</TableCell>
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
                            value={newGoal.title}
                            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                        />
                        <Input
                            placeholder="Tutar"
                            type="string"
                            value={newGoal.amount}
                            onChange={(e) => setNewGoal({ ...newGoal, amount: parseFloat(e.target.value) })}
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
                            placeholder="Tarih"
                            type="date"
                            value={newGoal.date}
                            onChange={(e) => setNewGoal({ ...newGoal, date: e.target.value })}
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
                                <SelectItem value="günlük">Günlük</SelectItem>
                                <SelectItem value="aylık">Aylık</SelectItem>
                                <SelectItem value="yıllık">Yıllık</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button className='btn primary-btn' onClick={handleAddGoal}>Ekle</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default Goals