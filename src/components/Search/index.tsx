import { forwardRef } from "react";
import { TextInput, StyleSheet, View, type TextInputProps } from "react-native";
import { moderateScale } from "react-native-size-matters";
import type { ColorScheme } from "~/hooks/useTheme";
import { Colors, Fonts } from "~/theme";
import useTheme from "~/hooks/useTheme";
import useThemePalette from "~/hooks/useThemePalette";
import { CloseIcon, SearchIcon } from "~/assets/icons";

interface Props extends Omit<TextInputProps, "value" | "placeholder"> {
  value?: string | number | null;
  placeholder?: string | null;
}

const Search = forwardRef<TextInput, Props>(
  ({ value, placeholder, numberOfLines = 1, style, ...rest }, ref) => {
    const theme = useTheme();
    const { colors } = useThemePalette();
    const styles = styling(theme);

    return (
      <View style={styles.container}>
        <SearchIcon
          width={moderateScale(26)}
          height={moderateScale(26)}
          color={colors.brand}
        />
        <TextInput
          ref={ref}
          value={value?.toString() || ""}
          style={[styles.input, style]}
          placeholder='Search'
          placeholderTextColor={colors.brand}
          hitSlop={10}
          numberOfLines={numberOfLines}
          {...rest}
        />
        <CloseIcon
          width={moderateScale(18)}
          height={moderateScale(18)}
          color={colors.brand}
        />
      </View>
    );
  }
);
export default Search;

const styling = (t: ColorScheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      height: moderateScale(36),
      paddingHorizontal: moderateScale(16),
      columnGap: moderateScale(6),
      backgroundColor: Colors[t].bgSearch,
      borderRadius: moderateScale(8),
    },
    input: {
      flex: 1,
      color: Colors[t].brand,
      fontFamily: Fonts.SF_PRO_Regular,
      fontSize: moderateScale(15),
    },
  });
