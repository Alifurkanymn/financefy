import { create } from "zustand";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { getAuth } from "firebase/auth";
import { toast } from "@/hooks/use-toast";

type Expense = {
  id: string;
  title: string;
  amount: number;
  currency: string;
  category: string;
  date: string;
  description: string;
  recurrence: string;
};

type ExpenseState = {
  expenses: Expense[];
  fetchExpenses: () => Promise<void>;
  addExpense: (expense: Expense) => Promise<void>;
  removeExpense: (id: string) => Promise<void>;
  updateExpense: (id: string, updatedExpense: Partial<Expense>) => Promise<void>;
  setExpenses: (expenses: Expense[]) => void;
  getExpense: (id: string) => Expense | undefined;
};

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],

  fetchExpenses: async () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid; 

    if (userId) {
      const querySnapshot = await getDocs(collection(db, "users", userId, "expenses"));
      const expenseList: Expense[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Expense[];
      set({ expenses: expenseList });
    }
  },

  addExpense: async (expense) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (userId) {
      const docRef = await addDoc(collection(db, "users", userId, "expenses"), expense);
      set((state) => ({
        expenses: [...state.expenses, { ...expense, id: docRef.id }],
      }));
      toast({ description: 'Gideriniz başarıyla eklendi !' });
    }
  },

  removeExpense: async (id) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (userId) {
      await deleteDoc(doc(db, "users", userId, "expenses", id));
      set((state) => ({
        expenses: state.expenses.filter((expense) => expense.id !== id),
      }));
      toast({ description: 'Gideriniz silindi !' });
    }
  },

  updateExpense: async (id, updatedExpense) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (userId) {
      const expenseRef = doc(db, "users", userId, "expenses", id);
      await updateDoc(expenseRef, updatedExpense);
      set((state) => ({
        expenses: state.expenses.map((expense) =>
          expense.id === id ? { ...expense, ...updatedExpense } : expense
        ),
      }));
      toast({ description: 'Gideriniz başarıyla güncellendi !' });
    }
  },

  setExpenses: (expenses) => set({ expenses }),

  getExpense: (id) => {
    const state = get();
    return state.expenses.find((expense) => expense.id === id);
  }
}));
