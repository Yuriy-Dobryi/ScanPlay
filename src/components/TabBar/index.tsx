import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useSegments, useRouter } from "expo-router";
import { HistoryIcon, ScanIcon, SettingsIcon } from "~/assets/icons";
import useThemePalette from "~/hooks/useThemePalette";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { ThemeColor } from "~/hooks/useThemeColor";
import useThemeColor from "~/hooks/useThemeColor";
import { Colors } from "~/theme";
import { moderateScale } from "react-native-size-matters";

const TabBar = () => {
  const segments = useSegments();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const focusedTab = segments[1] ?? "scan";

  const { colors } = useThemePalette();
  const theme = useThemeColor();
  const styles = styling(theme);

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom + moderateScale(6) },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.tabItem,
          focusedTab === "scan" && {
            backgroundColor: colors.tabItemActive,
          },
        ]}
        onPress={() => router.push("/scan")}
      >
        <ScanIcon
          width={32}
          height={32}
          color={
            focusedTab === "scan"
              ? colors.tabIconActive
              : colors.tabIconInactive
          }
        />
        <Text
          style={[
            styles.title,
            {
              color:
                focusedTab === "scan"
                  ? colors.tabIconActive
                  : colors.tabIconInactive,
            },
          ]}
        >
          Scan
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tabItem,
          focusedTab === "history" && {
            backgroundColor: colors.tabItemActive,
          },
        ]}
        onPress={() => router.push("/history")}
      >
        <HistoryIcon
          width={32}
          height={32}
          color={
            focusedTab === "history"
              ? colors.tabIconActive
              : colors.tabIconInactive
          }
        />
        <Text
          style={[
            styles.title,
            {
              color:
                focusedTab === "history"
                  ? colors.tabIconActive
                  : colors.tabIconInactive,
            },
          ]}
        >
          History
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tabItem,
          focusedTab === "settings" && {
            backgroundColor: colors.tabItemActive,
          },
        ]}
        onPress={() => router.push("/settings")}
      >
        <SettingsIcon
          width={32}
          height={32}
          color={
            focusedTab === "settings"
              ? colors.tabIconActive
              : colors.tabIconInactive
          }
        />
        <Text
          style={[
            styles.title,
            {
              color:
                focusedTab === "settings"
                  ? colors.tabIconActive
                  : colors.tabIconInactive,
            },
          ]}
        >
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styling = (t: ThemeColor) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingTop: moderateScale(6),
      paddingHorizontal: moderateScale(8),
      backgroundColor: Colors[t].bgHeader,
    },
    tabItem: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      rowGap: moderateScale(2),
      borderRadius: moderateScale(6),
    },
    title: {
      fontFamily: "Roboto-Medium",
      fontSize: moderateScale(12),
    },
  });

export default TabBar;
