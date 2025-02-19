import type { ReactNode } from "react";
import React, { useCallback } from "react";
import type { ColorValue, ViewProps } from "react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

import { Colors } from "~/theme";
import ArrowLeft from "~/assets/icons/ArrowLeft";
import Container from "~/components/Container";
import ThemedText from "~/components/ThemedText";
import useThemePalette from "~/hooks/useThemePalette";
import type { ColorScheme } from "~/hooks/useTheme";
import useTheme from "~/hooks/useTheme";

// import type { ParamListBase } from '@react-navigation/native';
// import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// import type { StackNavigationProp } from '@react-navigation/stack';

interface Props extends ViewProps {
  title?: string;
  titleBased?: boolean;
  centerElement?: ReactNode;
  goBackText?: string;
  goBackDisabled?: boolean;
  handleGoBack?: () => void;
  rightElement?: ReactNode;
  rightText?: string;
  onRightElement?: (() => void) | null;
  backgroundColor?: ColorValue;
  navigation?: any;
  // | StackNavigationProp<ParamListBase>
  // | BottomTabNavigationProp<ParamListBase>;
  alignEvenly?: boolean;
  safeAreaTop?: boolean;
  showDragIcon?: boolean;
}

export default ({
  navigation,
  title,
  titleBased = true,
  centerElement,
  goBackText,
  goBackDisabled,
  handleGoBack,
  rightElement,
  rightText,
  onRightElement,
  backgroundColor,
  alignEvenly,
  safeAreaTop = true,
  showDragIcon = false,
  style,
  ...rest
}: Props) => {
  const { colors } = useThemePalette();
  const theme = useTheme();
  const styles = styling(theme);

  const onGoBack = useCallback(() => {
    // navigation?.canGoBack() && navigation.goBack();
  }, [navigation]);

  return (
    <Container
      type='header'
      safeAreaTop={safeAreaTop}
      style={{ backgroundColor }}
    >
      <View style={[styles.headerView, style]} {...rest}>
        <Pressable
          onPress={handleGoBack || onGoBack}
          hitSlop={styles.hitSlop}
          style={[
            styles.leftContainer,
            titleBased ? styles.sideContainerSmall : styles.sideContainer,
          ]}
        >
          {((navigation?.canGoBack() && !goBackDisabled) || handleGoBack) && (
            <>
              <ArrowLeft />
              {goBackText && (
                <ThemedText style={styles.flexShrink_1} numberOfLines={1}>
                  {goBackText}
                </ThemedText>
              )}
            </>
          )}
        </Pressable>

        <View style={[styles.centerContainer, alignEvenly && { flex: 1 }]}>
          {showDragIcon && <View style={styles.draggableIcon} />}
          {title ? (
            <ThemedText h3 style={styles.flexShrink_1} numberOfLines={1}>
              {title}
            </ThemedText>
          ) : (
            centerElement
          )}
        </View>

        <Pressable
          onPress={onRightElement}
          hitSlop={styles.hitSlop}
          style={[
            styles.rightContainer,
            titleBased ? styles.sideContainerSmall : styles.sideContainer,
          ]}
        >
          {rightElement ||
            (rightText && (
              <ThemedText numberOfLines={1}>{rightText}</ThemedText>
            ))}
        </Pressable>
      </View>
    </Container>
  );
};

const styling = (t: ColorScheme) =>
  StyleSheet.create({
    headerView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: moderateScale(46),
      paddingHorizontal: moderateScale(16),
    },
    sideContainer: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      minWidth: "25%",
      maxWidth: "40%",
    },
    sideContainerSmall: { width: "8%" },
    leftContainer: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: moderateScale(6),
    },
    centerContainer: {
      flexGrow: 1,
      flexShrink: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    rightContainer: { alignItems: "flex-end" },
    draggableIcon: {
      position: "absolute",
      top: moderateScale(-16),
      width: moderateScale(40),
      height: moderateScale(6),
      backgroundColor: "gray",
      borderRadius: moderateScale(3),
    },
    hitSlop: {
      top: moderateScale(12),
      bottom: moderateScale(12),
      left: moderateScale(12),
      right: moderateScale(12),
    },
    flexShrink_1: {
      flexShrink: 1,
    },
  });
