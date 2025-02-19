import { StyleSheet } from "react-native";
import type { ColorScheme } from "~/hooks/useTheme";
import useTheme from "~/hooks/useTheme";
import Container from "~/components/Container";
import ThemedText from "~/components/ThemedText/index";

const SettingsScreen = () => {
  const theme = useTheme();
  const styles = styling(theme);

  return (
    <Container>
      <ThemedText>Settings screen</ThemedText>
    </Container>
  );
};

export default SettingsScreen;

const styling = (t: ColorScheme) => StyleSheet.create({});
