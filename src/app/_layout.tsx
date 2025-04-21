import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import "react-native-get-random-values";

import { useAppSetup } from "~/hooks/useAppSetup";
// import useAppState from "~/hooks/useAppState";
import useSystemThemeChange from "~/hooks/useSystemThemeChange";
import useThemeColor from "~/hooks/useThemeColor";

const RootLayout = () => {
  const { ready } = useAppSetup();
  const theme = useThemeColor();
  // useAppState();
  useSystemThemeChange();

  if (!ready) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style='auto' />
        <SafeAreaProvider>
          <KeyboardProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name='(tabs)' />
            </Stack>
          </KeyboardProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
