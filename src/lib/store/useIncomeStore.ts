import { create } from "zustand";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { getAuth } from "firebase/auth";
import { toast } from "@/hooks/use-toast";

type Income = {
  id?: string;
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
  fetchIncomes: () => Promise<void>;
  addIncome: (income: Income) => Promise<void>;
  removeIncome: (id: string) => Promise<void>;
  updateIncome: (id: string, updatedIncome: Partial<Income>) => Promise<void>;
};

export const useIncomeStore = create<IncomeState>((set) => ({
 incomes: [],

  fetchIncomes: async () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid; 

    if (userId) {
      const querySnapshot = await getDocs(collection(db, "users", userId, "incomes"));
      const incomeList: Income[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Income[];
      set({ incomes: incomeList });
    }
  },

  addIncome: async (income) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (userId) {
      const docRef = await addDoc(collection(db, "users", userId, "incomes"), income);
      set((state) => ({
        incomes: [...state.incomes, { ...income, id: docRef.id }],
      }));
      toast({ description: 'Geliriniz başarıyla eklendi !' });
    }
  },

  removeIncome: async (id) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (userId) {
      await deleteDoc(doc(db, "users", userId, "incomes", id));
      set((state) => ({
        incomes: state.incomes.filter((income) => income.id !== id),
      }));
      toast({ description: 'Geliriniz başarıyla silindi !' });
    }
  },

  updateIncome: async (id, updatedIncome) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (userId) {
      const incomeRef = doc(db, "users", userId, "incomes", id);
      await updateDoc(incomeRef, updatedIncome);
      set((state) => ({
        incomes: state.incomes.map((income) =>
          income.id === id ? { ...income, ...updatedIncome } : income
        ),
      }));
      toast({ description: 'Geliriniz başarıyla güncellendi !' });
    }
  },
}));
