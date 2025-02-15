import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NumericFormat } from 'react-number-format';
import { toast } from "@/hooks/use-toast";
import { Expense } from "@/app/types/types";

interface AddExpenseDialogProps {
    isOpen: boolean;
    onClose: () => void;
    addExpense: (expense: Expense) => void;
}

const AddExpenseDialog = ({ isOpen, onClose, addExpense }: AddExpenseDialogProps) => {
    const [newExpense, setNewExpense] = useState < Expense > ({
        id: '',
        title: '',
        amount: 0,
        currency: 'TRY',
        category: '',
        date: '',
        description: '',
        recurrence: 'Günlük',
    });

    const handleAddExpense = () => {
        if (!newExpense.title || newExpense.amount <= 0 || !newExpense.category || !newExpense.date) {
            toast({ description: 'Lütfen değerleri kontrol ediniz!' });
            return;
        }
        addExpense(newExpense);
        onClose();
        setNewExpense({
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
                    <DialogTitle>Yeni Gider Ekle</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <Input
                        placeholder="Başlık"
                        value={newExpense.title}
                        onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                    />
                    <NumericFormat
                        placeholder="Tutar"
                        value={newExpense.amount}
                        onValueChange={(values) => setNewExpense({ ...newExpense, amount: values.floatValue || 0 })}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale={true}
                        prefix="₺"
                        className="px-4 py-2 rounded-md border w-full outline-none"
                    />
                    <Select
                        value={newExpense.currency}
                        onValueChange={(value) => setNewExpense({ ...newExpense, currency: value })}
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
    );
};

export default AddExpenseDialog;
