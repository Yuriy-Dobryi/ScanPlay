import { useRef, useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
  type LayoutChangeEvent,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Camera,
  CameraRuntimeError,
  useCameraDevice,
  useCodeScanner,
  type CameraProps,
} from "react-native-vision-camera";
import useScanner from "~/hooks/useScanner";
import { useIsFocused } from "@react-navigation/native";
import useAppStatus from "~/hooks/useAppState";
import {
  addHistoryItem,
  getHistoryList,
  getMediaItemById,
} from "~/api/history";
import ScreenCard from "~/components/ScreenCard";

const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [isReadyToScan, setIsReadyToScan] = useState(false);
  const [flash, setFlash] = useState<CameraProps["torch"]>("off");

  const { askPermissions } = useScanner();
  const device = useCameraDevice("back");
  const { appStatus } = useAppStatus();
  const isScreenFocused = useIsFocused();
  const hasScanned = useRef(false);
  const router = useRouter();

  const [scanRegion, setScanRegion] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const onLayoutScanRegion = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setScanRegion({
      x,
      y,
      width,
      height,
    });
  };

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    // regionOfInterest: scanRegion,
    onCodeScanned: (codes) => {
      if (codes.length > 0 && !hasScanned.current) {
        const qrResult = codes[0].value;
        hasScanned.current = true;
        setIsReadyToScan(false);

        qrResult &&
          Alert.alert("QR Code Found", qrResult, [
            {
              text: "OK",
              onPress: async () => {
                const mediaItem = await getMediaItemById(qrResult);
                console.log({ mediaItem });

                if (mediaItem) {
                  const historyList = await getHistoryList();
                  const isItemInHistory = historyList.some(
                    (item) => item.id === qrResult
                  );
                  if (isItemInHistory) {
                    console.log("Item In History");
                  } else {
                    console.log("Not In History");
                    await addHistoryItem(mediaItem);
                  }
                }
                router.push("/history");
                setTimeout(() => {
                  hasScanned.current = false;
                  setIsReadyToScan(true);
                }, 1000);
              },
            },
          ]);
      }
    },
  });

  const onError = (error: CameraRuntimeError) => {
    Alert.alert("Error!", error.message);
  };

  const onInitialized = () => {
    setIsCameraInitialized(true);
    setIsReadyToScan(true);
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const result = await askPermissions();
      setHasPermission(result.type === "granted");
    };
    requestPermissions();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size='large' color='white' />
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text>Camera access is denied. Please enable it in settings.</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.center}>
        <Text>No camera found</Text>
      </View>
    );
  }

  return (
    <ScreenCard scroll={false} headerProps={{ title: "Find a code to scan" }}>
      <Camera
        device={device}
        codeScanner={codeScanner}
        photo={false}
        onInitialized={onInitialized}
        onError={onError}
        torch={flash}
        isActive={
          isCameraInitialized &&
          isReadyToScan &&
          appStatus === "active" &&
          isScreenFocused
        }
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay}>
        <View style={styles.cornerContainer} onLayout={onLayoutScanRegion}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
      </View>
    </ScreenCard>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  cornerContainer: {
    position: "absolute",
    width: "80%",
    height: "55%",
  },
  corner: {
    position: "absolute",
    width: 72,
    height: 72,
    borderWidth: 6,
    borderColor: "rgb(193, 156, 99)",
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopLeftRadius: 24,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopRightRadius: 24,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomLeftRadius: 24,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 24,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
});
