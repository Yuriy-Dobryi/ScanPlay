import { useEffect } from "react";
import { Appearance } from "react-native";
import useThemeStore from "~/zustand/themeStore";

const useSystemThemeChange = () => {
  const { theme, setSystemTheme } = useThemeStore();

  useEffect(() => {
    if (theme !== null) return;

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        setSystemTheme(colorScheme);
      }
    });

    return () => subscription.remove();
  }, [theme]);
};

export default useSystemThemeChange;
