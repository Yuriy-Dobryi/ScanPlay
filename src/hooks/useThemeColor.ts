import useThemeStore, { type ThemeStore } from "~/zustand/themeStore";

export type ThemeColor = Exclude<ThemeStore["theme"], null>;

const useThemeColor = (): ThemeColor => {
  const { theme, systemTheme } = useThemeStore();
  const resolvedTheme = theme || systemTheme || "light";
  return resolvedTheme;
};

export default useThemeColor;
