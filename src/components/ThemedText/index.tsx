import { useMemo } from "react";
import { Text, type TextProps } from "react-native";

import useThemePalette from "~/hooks/useThemePalette";
import { Colors } from "~/theme";
import typography from "~/theme/typography";

export type TextVariant = keyof typeof typography;
export type ColorName = keyof typeof Colors.light | keyof typeof Colors.dark;

export type ThemedTextProps = TextProps & {
  color?: ColorName;
  variant?: TextVariant;
} & {
  [K in ColorName | TextVariant]?: boolean;
};

const ThemedText = ({
  style,
  color = "tPrimary",
  variant = "text-m",
  ...rest
}: ThemedTextProps) => {
  const { colors } = useThemePalette();

  const restKeys = useMemo(() => Object.keys(rest), [rest]);
  const shorthandColor = restKeys.find((key) => key in Colors.light);
  const shorthandVariant = restKeys.find((key) => key in typography);

  const resolvedColor = (shorthandColor as ColorName) || color;
  const resolvedVariant = (shorthandVariant as TextVariant) || variant;

  return (
    <Text
      style={[
        typography[resolvedVariant],
        { color: colors[resolvedColor], textAlign: "left" },
        style,
      ]}
      allowFontScaling={false}
      textBreakStrategy='simple'
      {...rest}
    />
  );
};

export default ThemedText;
