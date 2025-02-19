import type { ReactNode } from "react";
import type { DimensionValue } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { isNumber } from "lodash";

import type { SafeAreaViewProps } from "react-native-safe-area-context";

import { Colors } from "~/theme";
import Spinner from "../Spinner";
import type { ColorScheme } from "~/hooks/useTheme";
import useTheme from "~/hooks/useTheme";

interface Props extends SafeAreaViewProps {
  type?: "header" | "content";
  safeAreaTop?: boolean;
  loading?: boolean;
  paddingVertical?: DimensionValue;
  children: ReactNode;
}

const Container = ({
  type = "content",
  safeAreaTop,
  loading,
  paddingVertical,
  style,
  children,
  ...rest
}: Props) => {
  const theme = useTheme();
  const containerTheme = styling(theme);

  return (
    <SafeAreaView
      edges={safeAreaTop ? ["top", "left", "right"] : ["left", "right"]}
      style={[
        containerTheme[type],
        isNumber(paddingVertical) && {
          paddingVertical: moderateScale(paddingVertical),
        },
        style,
      ]}
      {...rest}
    >
      {children}
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

export default Container;

const styling = (t: ColorScheme) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: moderateScale(16),
      paddingVertical: 0,
      backgroundColor: Colors[t].bgHeader,
    },
    content: {
      flex: 1,
      paddingHorizontal: moderateScale(16),
      paddingVertical: 0,
      backgroundColor: Colors[t].bgScreen,
    },
  });
