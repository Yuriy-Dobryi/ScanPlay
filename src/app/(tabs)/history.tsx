import { useCallback, useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { signIn } from "~/api/auth/signIn";
import {
  getHistoryList,
  addHistoryItem,
  type HistoryItemT,
} from "~/api/history";
import Container from "~/components/Container";
import Search from "~/components/Search";
import ThemedText from "~/components/ThemedText/index";
import type { ColorScheme } from "~/hooks/useTheme";
import useTheme from "~/hooks/useTheme";
import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import { moderateScale } from "react-native-size-matters";
import { PlayIcon } from "~/assets/icons";
import HistoryItem from "~/components/HistoryItem";
import { Colors, Fonts } from "~/theme";

const HistoryScreen = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItemT[]>([]);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const styles = styling(theme);

  const renderItem: ListRenderItem<HistoryItemT> = useCallback(
    ({ item }) => <HistoryItem {...item} onPress={() => null} />,
    []
  );

  const renderEmptyHistoryList = () => (
    <View style={styles.emptyContainer}>
      <ThemedText style={styles.emptyText}>No history yet</ThemedText>
    </View>
  );

  const renderSeparator = () => <View style={{ height: moderateScale(12) }} />;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const user = await signIn();
        if (user?.uid) {
          const res = await getHistoryList();
          setHistoryItems(res);
          // await addHistoryItem({
          //   id: "Custom1",
          //   title: "string",
          //   description: "string",
          //   imageUrl: "string",
          //   mediaUrl: "string",
          // });
          // console.log({ history });
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Container style={{ paddingHorizontal: 0 }}>
      <Search />
      <FlashList
        data={historyItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        estimatedItemSize={moderateScale(50)}
        // If defaulted to "false", the keyboard can overlap the content below (iOS)
        automaticallyAdjustKeyboardInsets
        // Keyboard overlap fix for Android platform
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        keyboardShouldPersistTaps='handled'
        ListEmptyComponent={renderEmptyHistoryList}
        contentContainerStyle={styles.historyList}
        ItemSeparatorComponent={renderSeparator}
      />
    </Container>
  );
};

export default HistoryScreen;

const styling = (t: ColorScheme) =>
  StyleSheet.create({
    historyList: {
      paddingTop: moderateScale(18),
      paddingLeft: moderateScale(16),
      paddingRight: moderateScale(24),
      gap: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: moderateScale(16),
    },
    emptyText: {
      color: Colors[t].tPrimary,
      fontFamily: Fonts.SF_PRO_Regular,
      fontSize: moderateScale(18),
    },
  });
