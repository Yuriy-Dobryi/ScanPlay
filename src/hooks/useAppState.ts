import { useAppState } from "@react-native-community/hooks";
import { useEffect, useRef, useState } from "react";
import type { AppStateStatus } from "react-native";

const useAppStatus = () => {
  const currentAppState = useAppState();
  const prevAppStateRef = useRef<AppStateStatus>(currentAppState);
  const [isOpenedFromBackground, setIsOpenedFromBackground] = useState(false);

  useEffect(() => {
    if (
      prevAppStateRef.current.match(/inactive|background/) &&
      currentAppState === "active"
    ) {
      setIsOpenedFromBackground(true);
    } else {
      setIsOpenedFromBackground(false);
    }

    prevAppStateRef.current = currentAppState;
  }, [currentAppState]);

  return { appStatus: currentAppState, isOpenedFromBackground };
};

export default useAppStatus;
