import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Alert, Appearance, LogBox, Platform } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import FontResources from "~/assets/fonts";
import appleAuth from "@invertase/react-native-apple-authentication";
import useAuthStore from "~/zustand/authStore";
import { logger } from "~/utils/logger";
import useThemeStore from "~/zustand/themeStore";

SplashScreen.preventAutoHideAsync();

export const useAppSetup = () => {
  const [loaded] = useFonts(FontResources);
  const { userAppleId, setToken } = useAuthStore();
  const { theme } = useThemeStore();
  const [requestsCompleted, setRequestsCompleted] = useState(false);

  const ready = useMemo(
    () => loaded && requestsCompleted,
    [loaded, requestsCompleted]
  );

  const onCheckAppleAuthState = async (userAppleId: string) => {
    try {
      const credentialState = await appleAuth.getCredentialStateForUser(
        userAppleId
      );
      if (credentialState !== appleAuth.State.AUTHORIZED) {
        setToken(null);
      }
    } catch (err) {
      logger(err);
    }
  };

  const fetchInitialRequests = async () => {
    if (Platform.OS === "ios" && userAppleId) {
      onCheckAppleAuthState(userAppleId);
    }
    await someAsyncRequest();
    await anotherAsyncRequest();
    setRequestsCompleted(true);
  };

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  useEffect(() => {
    fetchInitialRequests();
  }, []);

  useLayoutEffect(() => {
    // Fixes app theme preference, as it is applied only once per session on iOS, especially affecting the statusBar
    if (Platform.OS === "ios") Appearance.setColorScheme(theme);
  }, []);

  return { ready };
};

const IGNORED_LOGS = [
  "Non-serializable values were found in the navigation state",
  "Support for defaultProps will be removed from function components in a future major release.",
];
LogBox.ignoreLogs(IGNORED_LOGS);

const someAsyncRequest = async () => {
  return new Promise((resolve) => setTimeout(resolve, 100));
};

const anotherAsyncRequest = async () => {
  return new Promise((resolve) => setTimeout(resolve, 200));
};
