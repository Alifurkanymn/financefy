import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { toast } from "@/hooks/use-toast";

type AuthState = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState>((set) => {
  onAuthStateChanged(auth, (user) => {
    set({ user, loading: false });
  });

  return {
    user: null,
    loading: true, 

    login: async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        set({ user: userCredential.user });
      } catch (error) {
        console.error("Login Error:", error);
        toast({ description: 'Lütfen bilgilerinizi kontrol edin !' });
      }
    },

    register: async (email, password) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        set({ user: userCredential.user });
      } catch (error) {
        console.error("Registration Error:", error);
        toast({ description: 'Lütfen bilgilerinizi kontrol edin !' });
      }
    },

    loginWithGoogle: async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        set({ user: result.user });
      } catch (error) {
        console.error("Google Login Error:", error);
        toast({ description: 'Lütfen bilgilerinizi kontrol edin !' });
      }
    },

    logout: async () => {
      try {
        await signOut(auth);
        set({ user: null });
      } catch (error) {
        console.error("Logout Error:", error);
        toast({ description: 'Bir hata ile karşılaştık !' });
      }
    },

    setUser: (user) => set({ user }),
  };
});
