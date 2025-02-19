import { StyleSheet } from "react-native";
import type { ColorScheme } from "~/hooks/useTheme";
import useTheme from "~/hooks/useTheme";
import Container from "~/components/Container";
import ThemedText from "~/components/ThemedText/index";

const ProfileScreen = () => {
  const theme = useTheme();
  const styles = styling(theme);

  return (
    <Container>
      <ThemedText>Profile screen</ThemedText>
    </Container>
  );
};

export default ProfileScreen;

const styling = (t: ColorScheme) => StyleSheet.create({});
