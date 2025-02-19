import type { ActivityIndicatorProps } from "react-native";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import type { ColorScheme } from "~/hooks/useTheme";
import useTheme from "~/hooks/useTheme";
import useThemePalette from "~/hooks/useThemePalette";

interface Props extends ActivityIndicatorProps {
  type?: "contain" | "cover";
}

const Spinner = ({
  type = "contain",
  color,
  size = "large",
  style,
  ...rest
}: Props) => {
  const theme = useTheme();
  const { colors } = useThemePalette();
  const displayTheme = styling(theme);

  return (
    <View style={[displayTheme[type], style]}>
      <ActivityIndicator
        color={color || colors.spinner}
        size={size}
        {...rest}
      />
    </View>
  );
};
export default Spinner;

const styling = (t: ColorScheme) =>
  StyleSheet.create({
    contain: {
      position: "absolute",
      zIndex: 100,
      justifyContent: "center",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    cover: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    },
  });
