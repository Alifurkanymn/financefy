export interface Expense {
    id: string;
    title: string;
    amount: number;
    currency: string;
    category: string;
    date: string;
    description: string;
    recurrence: string;
}
export interface Income {
    id: string;
    title: string;
    amount: number;
    currency: string;
    category: string;
    date: string;
    description: string;
    recurrence: string;
}
export interface Goal {
   id: string;
    title: string;
    targetAmount: number;
    currency: string;
    startDate: string;
    currentSaving: number;
    category: string;
    description: string;
    status: string;
}
