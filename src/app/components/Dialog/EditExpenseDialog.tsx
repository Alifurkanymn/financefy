import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { NumericFormat } from 'react-number-format';
import { Expense } from "@/app/types/types";


interface EditExpenseDialogProps {
    isOpen: boolean;
    onClose: () => void;
    selectedExpense: Expense | null;
    updateExpense: (id: string, updatedExpense: Expense) => void;
}

const EditExpenseDialog = ({ isOpen, onClose, selectedExpense, updateExpense }: EditExpenseDialogProps) => {
    const { toast } = useToast();
    const [expense, setExpense] = useState < Expense > ({
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
        if (selectedExpense) {
            setExpense(selectedExpense);
        }
    }, [selectedExpense]);

    const handleUpdateExpense = () => {
        if (!expense.title || expense.amount <= 0 || !expense.category || !expense.date) {
            toast({ description: 'Lütfen değerleri kontrol ediniz!' });
            return;
        }
        updateExpense(expense.id, expense);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Giderini Düzenle</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <Input
                        placeholder="Başlık"
                        value={expense.title}
                        onChange={(e) => setExpense({ ...expense, title: e.target.value })}
                    />
                    <NumericFormat
                        placeholder="Gider Tutarı"
                        value={expense.amount}
                        onValueChange={(values) => setExpense({ ...expense, amount: values.floatValue || 0 })}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale={true}
                        prefix="₺"
                        className="px-4 py-2 rounded-md border w-full outline-none"
                    />
                    <Select
                        value={expense.currency}
                        onValueChange={(value) => setExpense({ ...expense, currency: value })}
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
                        value={expense.category}
                        onChange={(e) => setExpense({ ...expense, category: e.target.value })}
                    />
                    <Input
                        placeholder="Tarih"
                        type="date"
                        value={expense.date}
                        onChange={(e) => setExpense({ ...expense, date: e.target.value })}
                    />
                    <Input
                        placeholder="Açıklama"
                        value={expense.description}
                        onChange={(e) => setExpense({ ...expense, description: e.target.value })}
                    />
                </div>

                <DialogFooter>
                    <Button className='btn primary-btn' onClick={handleUpdateExpense}>Güncelle</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditExpenseDialog;
