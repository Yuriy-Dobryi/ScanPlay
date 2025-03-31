import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AuthStore = {
  token: string | null;
  userAppleId: string | null;
  setToken: (v: AuthStore["token"]) => void;
  setUserAppleId: (v: AuthStore["userAppleId"]) => void;
};

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      token: null,
      userAppleId: null,
      setToken: (v) => set({ token: v }),
      setUserAppleId: (v) => set({ userAppleId: v }),
    }),
    {
      name: "AuthStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
