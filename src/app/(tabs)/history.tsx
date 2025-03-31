import { useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { signIn } from "~/api/auth/signIn";
import { getHistoryList, type HistoryItemT } from "~/api/history";
import ScreenCard from "~/components/ScreenCard";
import Search from "~/components/Search";
import ThemedText from "~/components/ThemedText/index";
import type { ThemeColor } from "~/hooks/useThemeColor";
import useThemeColor from "~/hooks/useThemeColor";
import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import { moderateScale } from "react-native-size-matters";
import HistoryItem from "~/components/HistoryItem";
import { Colors, Fonts } from "~/theme";
import appleAuth, {
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import useAuthStore from "~/zustand/authStore";
import { logger } from "~/utils/logger";
import useThemeStore from "~/zustand/themeStore";
import Spinner from "~/components/Spinner";

const HistoryScreen = () => {
  const { token, setToken, setUserAppleId } = useAuthStore();
  const [search, setSearch] = useState("");
  const [historyItems, setHistoryItems] = useState<HistoryItemT[]>([]);
  const { setTheme } = useThemeStore();
  const [loading, setLoading] = useState(false);

  const theme = useThemeColor();
  const styles = styling(theme);

  async function onAppleButtonPress() {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      if (appleAuthRequestResponse.identityToken) {
        setToken(appleAuthRequestResponse.identityToken);
        setUserAppleId(appleAuthRequestResponse.user);
      }
      logger({ appleAuthRequestResponse });
    } catch (error) {
      console.log({ error });
    }
  }

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
    <ScreenCard scroll={false} headerProps={{ title: "History" }}>
      <Search
        value={search}
        onChangeText={setSearch}
        onClear={() => setSearch("")}
      />
      {token ? (
        loading ? (
          <Spinner />
        ) : (
          <FlashList
            data={historyItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            estimatedItemSize={moderateScale(50)}
            // If defaulted to "false", the keyboard can overlap the content below (iOS)
            automaticallyAdjustKeyboardInsets
            // Keyboard overlap fix for Android platform
            keyboardDismissMode={
              Platform.OS === "ios" ? "interactive" : "on-drag"
            }
            keyboardShouldPersistTaps='handled'
            ListEmptyComponent={renderEmptyHistoryList}
            contentContainerStyle={styles.historyList}
            ItemSeparatorComponent={renderSeparator}
          />
        )
      ) : (
        <AppleButton
          buttonStyle={AppleButton.Style.DEFAULT}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: moderateScale(200),
            height: moderateScale(50),
            alignSelf: "center",
            marginVertical: moderateScale(20),
          }}
          onPress={onAppleButtonPress}
        />
      )}
    </ScreenCard>
  );
};

export default HistoryScreen;

const styling = (t: ThemeColor) =>
  StyleSheet.create({
    historyList: {
      paddingTop: moderateScale(14),
      paddingBottom: moderateScale(20),
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
