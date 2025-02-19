import { useAtomValue } from 'jotai';

import { themeAtom, systemThemeAtom, type ThemeValue } from '~/jotai/themeAtom';

export type ColorScheme = Exclude<ThemeValue, null>;

const useTheme = (): ColorScheme => {
  const theme = useAtomValue(themeAtom);
  const systemTheme = useAtomValue(systemThemeAtom);
  const resolvedTheme = theme || systemTheme || 'light';

  return resolvedTheme;
};

export default useTheme;
