import { forwardRef, useMemo } from "react";
import {
  Platform,
  StyleSheet,
  View,
  type ScrollViewProps,
  type ViewProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { moderateScale } from "react-native-size-matters";
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps,
} from "react-native-keyboard-controller";
import Header, { type HeaderProps } from "../Header";
import { Colors } from "~/theme";
import useThemeColor from "~/hooks/useThemeColor";
import GradientView from "../GradientView";

type Props = {
  headerShown?: boolean;
  headerProps?: HeaderProps;
} & (
  | ({ scroll: "keyboard-controller" } & Omit<
      KeyboardAwareScrollViewProps,
      "scroll"
    >)
  | ({ scroll: true } & Omit<ScrollViewProps, "scroll">)
  | ({ scroll: false; contentContainerStyle?: never } & ViewProps)
);

export const BOTTOM_INSET = 40;

const ScreenCard = forwardRef<ScrollView, Props>(
  (
    {
      headerShown = true,
      headerProps,
      scroll = true,
      contentContainerStyle,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const theme = useThemeColor();

    const safeTopInset = useMemo(
      () => (Platform.OS === "ios" ? insets.top : insets.top + 24),
      [insets]
    );

    return (
      <View
        style={[
          {
            flex: 1,
            backgroundColor: Colors[theme].bgScreen,
          },
          !headerShown && { paddingTop: safeTopInset },
        ]}
      >
        {headerShown && (
          <Header {...headerProps} style={{ paddingTop: safeTopInset }} />
        )}

        {scroll === "keyboard-controller" ? (
          <KeyboardAwareScrollView
            ref={ref}
            bottomOffset={moderateScale(30)}
            extraKeyboardSpace={0}
            disableScrollOnKeyboardHide
            keyboardShouldPersistTaps='handled'
            style={[{ marginTop: moderateScale(4) }, style]}
            contentContainerStyle={[styles.content, contentContainerStyle]}
            showsVerticalScrollIndicator={false}
            {...(props as Omit<KeyboardAwareScrollViewProps, "scroll">)}
          >
            {children}
          </KeyboardAwareScrollView>
        ) : scroll ? (
          <ScrollView
            ref={ref}
            style={[{ marginTop: moderateScale(4) }, style]}
            contentContainerStyle={[styles.content, contentContainerStyle]}
            showsVerticalScrollIndicator={false}
            {...(props as Omit<ScrollViewProps, "scroll">)}
          >
            {children}
          </ScrollView>
        ) : (
          <View
            style={[styles.content, { paddingVertical: 20 }, style]}
            {...(props as ViewProps)}
          >
            {children}
          </View>
        )}
      </View>
    );
  }
);

export default ScreenCard;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: moderateScale(16),
    paddingBottom: moderateScale(BOTTOM_INSET),
  },
});
