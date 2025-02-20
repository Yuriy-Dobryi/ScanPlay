import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { signIn } from "~/api/auth/signIn";
import { getHistoryList, addHistoryItem } from "~/api/history";
import Container from "~/components/Container";
import Search from "~/components/Search";
import ThemedText from "~/components/ThemedText/index";
import type { ColorScheme } from "~/hooks/useTheme";
import useTheme from "~/hooks/useTheme";

const HistoryScreen = () => {
  const theme = useTheme();
  const styles = styling(theme);

  useEffect(() => {
    (async () => {
      const user = await signIn();
      if (user?.uid) {
        // const history = await getHistoryList();
        // await addHistoryItem({
        //   imageUrl: "https://example.com/image4.jpg",
        //   title: "QR Code 3",
        // });
        // console.log({ history });
      }
    })();
  }, []);

  return (
    <Container>
      <Search />
    </Container>
  );
};

export default HistoryScreen;

const styling = (t: ColorScheme) => StyleSheet.create({});
