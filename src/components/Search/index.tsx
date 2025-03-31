import { forwardRef } from "react";
import {
  type TextInputProps,
  TextInput,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors, Fonts } from "~/theme";
import { CloseIcon, SearchIcon } from "~/assets/icons";
import useThemeColor, { type ThemeColor } from "~/hooks/useThemeColor";

interface Props extends Omit<TextInputProps, "value" | "placeholder"> {
  value?: string | number | null;
  placeholder?: string | null;
  onClear?: () => void;
}

const Search = forwardRef<TextInput, Props>(
  ({ value, placeholder, onClear, numberOfLines = 1, style, ...rest }, ref) => {
    const theme = useThemeColor();
    const styles = styling(theme);

    return (
      <View style={styles.container}>
        <SearchIcon
          width={moderateScale(26)}
          height={moderateScale(26)}
          color={Colors[theme].brand}
        />
        <TextInput
          ref={ref}
          value={value?.toString() || ""}
          style={[styles.input, style]}
          placeholder='Search'
          placeholderTextColor={Colors[theme].tPlaceholder}
          numberOfLines={numberOfLines}
          autoCorrect={false}
          hitSlop={10}
          {...rest}
        />
        {value && (
          <Pressable
            onPress={onClear}
            hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
          >
            <CloseIcon
              width={moderateScale(20)}
              height={moderateScale(20)}
              color={Colors[theme].brand}
            />
          </Pressable>
        )}
      </View>
    );
  }
);
export default Search;

const styling = (t: ThemeColor) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      height: moderateScale(42),
      marginBottom: moderateScale(4),
      paddingHorizontal: moderateScale(16),
      columnGap: moderateScale(6),
      backgroundColor: Colors[t].bgSearch,
      borderRadius: moderateScale(8),
    },
    input: {
      flex: 1,
      color: Colors[t].tSearch,
      fontFamily: Fonts.SF_PRO_Regular,
      fontSize: moderateScale(18),
    },
  });
