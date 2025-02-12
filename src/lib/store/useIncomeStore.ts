import { create } from "zustand";

type Income = {
    id: string;
    title: string;
    amount: number;
    currency: string;
    category: string;
    date: string;
    description: string;
    recurrence: string;
};

type IncomeState = {
    incomes: Income[];
    addIncome: (income: Income) => void;
    removeIncome: (id: string) => void;
    updateIncome: (id: string, updatedIncome: Partial<Income>) => void;
    setIncomes: (incomes: Income[]) => void;
    getIncome: (id: string) => Income | undefined;
};

export const useIncomeStore = create<IncomeState>((set, get) => ({
    incomes: [],
    addIncome: (income) =>
        set((state) => ({ incomes: [...state.incomes, { ...income, id: crypto.randomUUID() }] })),
    removeIncome: (id) =>
        set((state) => ({ incomes: state.incomes.filter((income) => income.id !== id) })),
    updateIncome: (id, updatedIncome) =>
        set((state) => ({
            incomes: state.incomes.map((income) =>
                income.id === id ? { ...income, ...updatedIncome } : income
            ),
        })),
    setIncomes: (incomes) => set({ incomes }),
    getIncome: (id) => {
        const state = get();
        return state.incomes.find((income) => income.id === id);
    }
}));
