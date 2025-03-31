import { StyleSheet } from "react-native";
import type { ThemeColor } from "~/hooks/useThemeColor";
import useThemeColor from "~/hooks/useThemeColor";
import ScreenCard from "~/components/ScreenCard";
import ThemedText from "~/components/ThemedText/index";

const ProfileScreen = () => {
  const theme = useThemeColor();
  const styles = styling(theme);

  return (
    <ScreenCard scroll>
      <ThemedText>Profile screen</ThemedText>
    </ScreenCard>
  );
};

export default ProfileScreen;

const styling = (t: ThemeColor) => StyleSheet.create({});
