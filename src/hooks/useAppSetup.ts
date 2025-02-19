import { useEffect, useMemo, useState } from 'react';
import { LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import FontResources from '~/assets/fonts';

SplashScreen.preventAutoHideAsync();

export const useAppSetup = () => {
  const [loaded] = useFonts(FontResources);
  const [requestsCompleted, setRequestsCompleted] = useState(false);
  const ready = useMemo(
    () => loaded && requestsCompleted,
    [loaded, requestsCompleted],
  );

  const fetchInitialRequests = async () => {
    try {
      await someAsyncRequest();
      await anotherAsyncRequest();
      setRequestsCompleted(true);
    } catch {
      console.error('Error during initial requests:');
      setRequestsCompleted(false);
    }
  };

  useEffect(() => {
    fetchInitialRequests();
  }, []);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  return { ready };
};

const IGNORED_LOGS = [
  'Non-serializable values were found in the navigation state',
  'Support for defaultProps will be removed from function components in a future major release.',
];
LogBox.ignoreLogs(IGNORED_LOGS);

const someAsyncRequest = async () => {
  return new Promise(resolve => setTimeout(resolve, 100));
};

const anotherAsyncRequest = async () => {
  return new Promise(resolve => setTimeout(resolve, 200));
};
