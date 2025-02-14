import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Income } from '@/app/types/types';

interface EditIncomeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    income: Income | null;
    updateIncome: (id: string, updatedIncome: Income) => void;
}

const EditIncomeDialog = ({ isOpen, onClose, income, updateIncome }: EditIncomeDialogProps) => {
    const [editedIncome, setEditedIncome] = useState < Income > ({
        id: "",
        title: '',
        amount: 0,
        currency: 'TRY',
        category: '',
        date: '',
        description: '',
        recurrence: 'Günlük',
    });

    useEffect(() => {
        if (income) {
            setEditedIncome(income);
        }
    }, [income]);

    const handleUpdateIncome = () => {
        if (!editedIncome.title || editedIncome.amount <= 0 || !editedIncome.category || !editedIncome.date) {
            alert("Lütfen tüm alanları doldurun!");
            return;
        }
        updateIncome(editedIncome.id, editedIncome);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Gelir Düzenle</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <Input
                        placeholder="Başlık"
                        value={editedIncome.title}
                        onChange={(e) => setEditedIncome({ ...editedIncome, title: e.target.value })}
                    />
                    <Input
                        placeholder="Tutar"
                        type="number"
                        value={editedIncome.amount}
                        onChange={(e) => setEditedIncome({ ...editedIncome, amount: parseFloat(e.target.value) || 0 })}
                    />
                    <Select
                        value={editedIncome.currency}
                        onValueChange={(value) => setEditedIncome({ ...editedIncome, currency: value })}
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
                        value={editedIncome.category}
                        onChange={(e) => setEditedIncome({ ...editedIncome, category: e.target.value })}
                    />
                    <Input
                        placeholder="Tarih"
                        type="date"
                        value={editedIncome.date}
                        onChange={(e) => setEditedIncome({ ...editedIncome, date: e.target.value })}
                    />
                    <Input
                        placeholder="Açıklama"
                        value={editedIncome.description}
                        onChange={(e) => setEditedIncome({ ...editedIncome, description: e.target.value })}
                    />
                    <Select
                        value={editedIncome.recurrence}
                        onValueChange={(value) => setEditedIncome({ ...editedIncome, recurrence: value })}
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
                    <Button className='btn primary-btn' onClick={handleUpdateIncome}>Güncelle</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditIncomeDialog;
