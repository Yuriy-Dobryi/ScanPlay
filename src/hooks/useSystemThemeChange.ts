import { useCallback, useEffect, useRef } from 'react';
import { Alert, Appearance, type ColorSchemeName } from 'react-native';
import { useAtom } from 'jotai';

import { systemThemeAtom, themeAtom } from '~/jotai/themeAtom';

const useSystemThemeChange = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const [savedSystemTheme, setSavedSystemTheme] = useAtom(systemThemeAtom);
  const themeRef = useRef(theme);

  const onSystemThemeChange = useCallback(
    async (systemTheme: ColorSchemeName) => {
      const showAlert =
        themeRef.current !== null &&
        themeRef.current !== systemTheme &&
        systemTheme !== undefined;
      setSavedSystemTheme(systemTheme);

      if (showAlert) {
        const confirmed = await showThemeChangeAlert(systemTheme);
        if (confirmed) {
          setTheme(systemTheme);
        }
      }
    },
    [theme],
  );

  const onCheckSystemThemeChange = useCallback(async () => {
    const systemTheme = Appearance.getColorScheme();
    const hasSystemThemeChanged = systemTheme !== savedSystemTheme;
    const showAlert =
      hasSystemThemeChanged &&
      theme !== null &&
      theme !== systemTheme &&
      systemTheme !== undefined;
    setSavedSystemTheme(systemTheme);

    if (showAlert) {
      const confirmed = await showThemeChangeAlert(systemTheme);
      if (confirmed) {
        setTheme(systemTheme);
      }
    }
  }, [theme]);

  const showThemeChangeAlert = async (systemTheme: ColorSchemeName) =>
    new Promise(resolve => {
      Alert.alert(
        'System theme Changed',
        `Would you like to apply the system ${systemTheme} theme to the app?`,
        [
          {
            text: 'No',
            style: 'destructive',
            onPress: () => resolve(false),
          },
          {
            text: 'Yes',
            style: 'default',
            onPress: () => resolve(true),
          },
        ],
      );
    });

  useEffect(() => {
    onCheckSystemThemeChange();
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      onSystemThemeChange(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);
};

export default useSystemThemeChange;
