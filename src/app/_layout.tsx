import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
import { useAppSetup } from "~/hooks/useAppSetup";
import useAppState from "~/hooks/useAppState";
import useSystemThemeChange from "~/hooks/useSystemThemeChange";

const RootLayout = () => {
  const { ready } = useAppSetup();
  useAppState();
  const colorScheme = useColorScheme();
  useSystemThemeChange();

  if (!ready) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
      <StatusBar style='auto' />
    </ThemeProvider>
  );
};

export default RootLayout;
