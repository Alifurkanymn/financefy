import { create } from "zustand";

type Expense = {
    id: string;
    title: string;
    amount: number;
    category: string;
    date: string;
    description: string;
    recurrence: string;
};

type ExpenseState = {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
    removeExpense: (id: string) => void;
    updateExpense: (id: string, updateExpense: Partial<Expense>) => void;
    setExpenses: (expenses: Expense[]) => void;
    getExpense: (id: string) => Expense | undefined;
};

export const useExpenseStore = create<ExpenseState>((set, get) => ({
    expenses: [],
    addExpense: (expense) =>
        set((state) => ({
            expenses: [...state.expenses, { ...expense, id: crypto.randomUUID() }]
        })),
    removeExpense: (id) =>
        set((state) => ({
            expenses: state.expenses.filter((expense) => expense.id !== id)
        })),
    updateExpense: (id, updatedExpense) =>
        set((state) => ({
            expenses: state.expenses.map((expense) =>
                expense.id === id ? { ...expense, ...updatedExpense } : expense
            ),
        })),
    setExpenses: (expenses) => set({ expenses }),
    getExpense: (id) => {
        const state = get();
        return state.expenses.find((expense) => expense.id === id);
    }
}));
