import type { ActivityIndicatorProps } from "react-native";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import type { ThemeColor } from "~/hooks/useThemeColor";
import useThemeColor from "~/hooks/useThemeColor";
import { Colors } from "~/theme";

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
  const theme = useThemeColor();
  const containerStyle = styling(theme);

  return (
    <View style={[containerStyle[type], style]}>
      <ActivityIndicator
        color={color || Colors[theme].spinner}
        size={size}
        {...rest}
      />
    </View>
  );
};
export default Spinner;

const styling = (t: ThemeColor) =>
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
