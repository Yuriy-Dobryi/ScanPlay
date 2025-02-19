import { useCallback } from "react";
import { useCameraPermission } from "react-native-vision-camera";

export type TUsePermissionsReturnType = {
  isError?: boolean;
  type: "granted" | "denied";
  errorMessage?: string;
};

const useScanner = () => {
  const { hasPermission, requestPermission } = useCameraPermission();

  const askPermissions =
    useCallback(async (): Promise<TUsePermissionsReturnType> => {
      try {
        if (hasPermission) {
          return { type: "granted" };
        }

        const granted = await requestPermission();
        return granted ? { type: "granted" } : { type: "denied" };
      } catch (e: any) {
        return {
          isError: true,
          type: "denied",
          errorMessage: e?.message || "Error when requesting permissions",
        };
      }
    }, [hasPermission, requestPermission]);

  return {
    askPermissions,
  };
};

export default useScanner;
