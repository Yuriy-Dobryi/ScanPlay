import { Appearance, type ColorSchemeName } from "react-native";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeStore = {
  theme: "light" | "dark" | null;
  systemTheme: ColorSchemeName;
  setTheme: (v: ThemeStore["theme"]) => void;
  setSystemTheme: (v: ThemeStore["systemTheme"]) => void;
};

const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      theme: null,
      systemTheme: Appearance.getColorScheme(),
      setTheme: (v) => set({ theme: v }),
      setSystemTheme: (v) => set({ systemTheme: v }),
    }),
    {
      name: "ThemeStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useThemeStore;
