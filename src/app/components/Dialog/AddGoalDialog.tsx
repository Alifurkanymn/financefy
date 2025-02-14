'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useGoalStore } from '@/lib/store/useGoalStore';
import { NumericFormat } from 'react-number-format';
import { Goal } from '@/app/types/types';

type AddGoalDialogProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const AddGoalDialog = ({ isOpen, setIsOpen }: AddGoalDialogProps) => {
    const { addGoal } = useGoalStore();
    const [newGoal, setNewGoal] = useState < Goal > ({
        id: '',
        title: '',
        targetAmount: 0,
        currency: 'TRY',
        startDate: '',
        currentSaving: 0,
        category: '',
        description: '',
        status: 'Active',
    });

    const handleAddGoal = () => {
        addGoal({ ...newGoal });
        setIsOpen(false);
        setNewGoal({
            id: '',
            title: '',
            targetAmount: 0,
            currency: 'TRY',
            startDate: '',
            currentSaving: 0,
            category: '',
            description: '',
            status: 'Active',
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                    <NumericFormat
                        placeholder="Hedef Tutarı"
                        value={newGoal.targetAmount}
                        onValueChange={(values) => setNewGoal({ ...newGoal, targetAmount: values.floatValue || 0 })}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale={true}
                        prefix="₺"
                        className="px-4 py-2 rounded-md border w-full outline-none"
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
                </div>

                <DialogFooter>
                    <Button className='btn primary-btn' onClick={handleAddGoal}>Ekle</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddGoalDialog;
