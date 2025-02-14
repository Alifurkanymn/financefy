import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { NumericFormat } from 'react-number-format';
import { toast } from '@/hooks/use-toast';
import { Income } from '@/app/types/types';

interface AddIncomeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    addIncome: (income: Income) => void;
}


const AddIncomeDialog = ({ isOpen, onClose, addIncome }: AddIncomeDialogProps) => {
    const [newIncome, setNewIncome] = useState < Income > ({
        id: '',
        title: '',
        amount: 0,
        currency: 'TRY',
        category: '',
        date: '',
        description: '',
        recurrence: 'Günlük',
    });

    const handleAddIncome = () => {
        if (!newIncome.title || newIncome.amount <= 0 || !newIncome.category || !newIncome.date) {
            toast({ description: 'Lütfen değerleri kontrol ediniz!' });
            return;
        }
        addIncome(newIncome);
        onClose();
        setNewIncome({
            id: '',
            title: '',
            amount: 0,
            currency: 'TRY',
            category: '',
            date: '',
            description: '',
            recurrence: 'Günlük',
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
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
                    <NumericFormat
                        placeholder="Tutar"
                        value={newIncome.amount}
                        onValueChange={(values) => setNewIncome({ ...newIncome, amount: values.floatValue || 0 })}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale={true}
                        prefix="₺"
                        className="px-4 py-2 rounded-md border w-full outline-none"
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
    );
};

export default AddIncomeDialog;
