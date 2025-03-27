import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { GlassesIcon, PlayIcon } from "~/assets/icons";
import type { HistoryItemT } from "~/api/history";
import { moderateScale } from "react-native-size-matters";
import ThemedText from "../ThemedText";

interface Props extends HistoryItemT {
  onPress: () => void;
}

const HistoryItem = ({ title, description, imageUrl, onPress }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.imageView}
          contentFit='cover'
        />
      ) : (
        <View style={[styles.imageView, styles.placeholderView]}>
          <View style={styles.placeholderCircle}>
            <GlassesIcon color='rgb(50, 50, 60)' />
          </View>
        </View>
      )}

      <View style={styles.textContent}>
        <View>
          <ThemedText title style={styles.title}>
            {title}
          </ThemedText>
          <ThemedText text-s color='tSecondary'>
            {description}
          </ThemedText>
        </View>
        <PlayIcon color='rgb(220, 193, 144)' style={{ alignSelf: "center" }} />
      </View>
    </Pressable>
  );
};

export default HistoryItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingRight: moderateScale(8),
  },
  imageView: {
    width: moderateScale(64),
    height: moderateScale(72),
    borderRadius: moderateScale(6),
    marginRight: moderateScale(12),
  },
  placeholderView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(50, 50, 60)",
  },
  placeholderCircle: {
    justifyContent: "center",
    alignItems: "center",
    width: moderateScale(46),
    height: moderateScale(46),
    backgroundColor: "rgb(232, 189, 124)",
    borderRadius: moderateScale(23),
  },
  textContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(186, 186, 186, 0.6)",
  },

  title: { marginBottom: 4 },
});
