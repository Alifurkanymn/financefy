import { create } from "zustand";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { getAuth } from "firebase/auth";

type Goal = {
  id?: string;
  title: string;
  targetAmount: number;
  currency: string;
  startDate: string;
  endDate: string;
  currentSaving: number;
  category: string;
  description: string;
  status: string;
  recurrence: string;
};

type GoalState = {
  goals: Goal[];
  fetchGoals: () => Promise<void>;
  addGoal: (goal: Goal) => Promise<void>;
  removeGoal: (id: string) => Promise<void>;
  updateGoal: (id: string, updatedGoal: Partial<Goal>) => Promise<void>;
  setGoals: (goals: Goal[]) => void;
  getGoal: (id: string) => Goal | undefined;
};

export const useGoalStore = create<GoalState>((set, get) => ({
  goals: [],

  fetchGoals: async () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (userId) {
      const querySnapshot = await getDocs(collection(db, "users", userId, "goals"));
      const goalList: Goal[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Goal[];
      set({ goals: goalList });
    }
  },

  addGoal: async (goal) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (userId) {
      const docRef = await addDoc(collection(db, "users", userId, "goals"), goal);
      set((state) => ({
        goals: [...state.goals, { ...goal, id: docRef.id }],
      }));
    }
  },

  removeGoal: async (id) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (userId) {
      await deleteDoc(doc(db, "users", userId, "goals", id));
      set((state) => ({
        goals: state.goals.filter((goal) => goal.id !== id),
      }));
    }
  },

  updateGoal: async (id, updatedGoal) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (userId) {
      const goalRef = doc(db, "users", userId, "goals", id);
      await updateDoc(goalRef, updatedGoal);
      set((state) => ({
        goals: state.goals.map((goal) =>
          goal.id === id ? { ...goal, ...updatedGoal } : goal
        ),
      }));
    }
  },

  setGoals: (goals) => set({ goals }),

  getGoal: (id) => {
    const state = get();
    return state.goals.find((goal) => goal.id === id);
  }
}));
