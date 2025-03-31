import { type ReactNode, useCallback } from "react";
import {
  type ColorValue,
  type ViewProps,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

import ArrowLeft from "~/assets/icons/ArrowLeft";
import ThemedText from "~/components/ThemedText";
import useThemePalette from "~/hooks/useThemePalette";

export interface HeaderProps extends ViewProps {
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
  alignEvenly?: boolean;
  safeAreaTop?: boolean;
  showDragIcon?: boolean;
}

export default function Header({
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
}: HeaderProps) {
  const { colors } = useThemePalette();

  const onGoBack = useCallback(() => {
    // navigation?.canGoBack() && navigation.goBack();
  }, [navigation]);

  return (
    <View
      style={[
        styles.headerView,
        { backgroundColor: backgroundColor || colors.bgHeader },
        style,
      ]}
      {...rest}
    >
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
          <ThemedText title style={styles.flexShrink_1} numberOfLines={1}>
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
          (rightText && <ThemedText numberOfLines={1}>{rightText}</ThemedText>)}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: moderateScale(70),
    paddingHorizontal: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: "gray",
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
