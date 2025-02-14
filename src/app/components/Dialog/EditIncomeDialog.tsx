import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const EditIncomeDialog = ({ isOpen, onClose, income, updateIncome }) => {
    const [editedIncome, setEditedIncome] = useState(income);

    useEffect(() => {
        setEditedIncome(income);
    }, [income]);

    const handleUpdateIncome = () => {
        if (editedIncome) {
            updateIncome(editedIncome.id, editedIncome);
            onClose();
        }
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
                        value={editedIncome?.title}
                        onChange={(e) => setEditedIncome({ ...editedIncome, title: e.target.value })}
                    />
                    <Input
                        placeholder="Tutar"
                        type="number"
                        value={editedIncome?.amount}
                        onChange={(e) => setEditedIncome({ ...editedIncome, amount: parseFloat(e.target.value) || 0 })}
                    />
                    <Select
                        value={editedIncome?.currency}
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
                        value={editedIncome?.category}
                        onChange={(e) => setEditedIncome({ ...editedIncome, category: e.target.value })}
                    />
                    <Input
                        placeholder="Tarih"
                        type="date"
                        value={editedIncome?.date}
                        onChange={(e) => setEditedIncome({ ...editedIncome, date: e.target.value })}
                    />
                    <Input
                        placeholder="Açıklama"
                        value={editedIncome?.description}
                        onChange={(e) => setEditedIncome({ ...editedIncome, description: e.target.value })}
                    />
                    <Select
                        value={editedIncome?.recurrence}
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
