import { User } from "@/entities/User";
import { create } from "zustand";

interface AuthStore {
  authUser: User | null;
  setAuthUser: (authUser: User | null) => void;
}

export const userAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  setAuthUser: (authUser: User | null) => set(() => ({ authUser })),
}));
