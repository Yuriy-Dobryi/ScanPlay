import { Appearance, type ColorSchemeName as SystemTheme } from "react-native";
import { atomWithStorage } from "jotai/utils";

import { asyncStorage } from "./asyncStorage";

export type ThemeValue = Exclude<SystemTheme, undefined>;

export const systemThemeAtom = atomWithStorage<SystemTheme>(
  "system-theme",
  Appearance.getColorScheme(),
  asyncStorage,
  {
    getOnInit: true,
  }
);

export const themeAtom = atomWithStorage<ThemeValue>(
  "theme",
  null,
  asyncStorage,
  {
    getOnInit: true,
  }
);
