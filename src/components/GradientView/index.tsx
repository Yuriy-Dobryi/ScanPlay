import type { ReactNode } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import LinearGradient, {
  type LinearGradientProps,
} from "react-native-linear-gradient";
import images from "~/assets/images";

const windowWidth = Dimensions.get("window").width;

type Props = {
  gradient?: LinearGradientProps["colors"];
  children: ReactNode;
};

export default function GradientView({ gradient, children }: Props) {
  const colors = ["#1F083D", "#13002B"];

  const isRTL = false;

  return (
    <LinearGradient colors={gradient || colors} style={{ flex: 1 }}>
      <View style={styles.children}>{children}</View>

      <View
        style={[
          StyleSheet.absoluteFillObject,
          { flex: 1, backgroundColor: "rgba(33, 0, 74, 0.5)" },
        ]}
      >
        <Image
          source={images["hue-top-left"]}
          style={[
            styles.image,
            {
              width: 250,
              height: 250,
              top: -30,
              left: isRTL ? windowWidth - 250 + 30 : -30,
            },
          ]}
        />
        <Image
          source={images["hue-top-right"]}
          style={[
            styles.image,
            {
              width: 180,
              height: 180,
              top: -30,
              right: isRTL ? windowWidth - 180 + 30 : -30,
            },
          ]}
        />
        <Image
          source={images["hue-center-left"]}
          style={[
            styles.image,
            {
              width: 250,
              height: 250,
              top: 300,
              left: isRTL ? windowWidth - 250 + 70 : -70,
            },
          ]}
        />
        <Image
          source={images["hue-bottom-right"]}
          style={[
            styles.image,
            {
              width: 300,
              height: 300,
              bottom: 60,
              right: isRTL ? windowWidth - 300 + 90 : -90,
            },
          ]}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  children: {
    flex: 1,
    position: "relative",
    zIndex: 1,
  },
  image: {
    opacity: 0.5,
    position: "absolute",
    resizeMode: "contain",
  },
});
