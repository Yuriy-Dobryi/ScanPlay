import { StyleSheet, View, Pressable } from "react-native";
import type { ThemeColor } from "~/hooks/useThemeColor";
import useThemeColor from "~/hooks/useThemeColor";
import ScreenCard from "~/components/ScreenCard";
import LocationSearch from "~/components/LocationSearch";
import ThemedText from "~/components/ThemedText/index";
import useThemeStore, { type ThemeStore } from "~/zustand/themeStore";
import { moderateScale } from "react-native-size-matters";
import { Appearance } from "react-native";
import { Colors } from "~/theme";

type ThemeOption = {
  name: string;
  value: ThemeStore["theme"];
};

const options: ThemeOption[] = [
  { name: "Light", value: "light" },
  { name: "Dark", value: "dark" },
  { name: "System", value: null },
];

const SettingsScreen = () => {
  const { theme, setTheme } = useThemeStore();
  const themeColor = useThemeColor();
  const styles = styling(themeColor);

  return (
    <ScreenCard scroll={false} headerProps={{ title: "Settings" }}>
      <View style={styles.optionItem}>
        {/* <ThemedText>Theme</ThemedText> */}
        <View style={styles.themeList}>
          {options.map((item, index) => (
            <Pressable
              key={index}
              style={[
                styles.themeItem,
                theme === item.value && styles.themeItemActive,
              ]}
              onPress={() => {
                Appearance.setColorScheme(item.value);
                setTheme(item.value);
              }}
            >
              <ThemedText>{item.name}</ThemedText>
            </Pressable>
          ))}
        </View>
      </View>
      <LocationSearch />
    </ScreenCard>
  );
};

export default SettingsScreen;

const styling = (t: ThemeColor) =>
  StyleSheet.create({
    optionItem: {
      rowGap: moderateScale(12),
    },
    themeList: {
      flexDirection: "row",
      alignItems: "center",
      height: moderateScale(30),
      backgroundColor: Colors[t].selectorList,
      borderRadius: moderateScale(10),
    },
    themeItem: {
      flex: 1,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: moderateScale(9),
    },
    themeItemActive: { backgroundColor: Colors[t].selectorActive },
  });
