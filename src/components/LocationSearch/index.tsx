import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  GooglePlacesAutocomplete,
  type GooglePlaceData,
  type Point,
} from "react-native-google-places-autocomplete";
import { isPointWithinRadius } from "geolib";
import { moderateScale } from "react-native-size-matters";
import type { ThemeColor } from "~/hooks/useThemeColor";
import useThemeColor from "~/hooks/useThemeColor";
import { logger } from "~/utils/logger";
import { Colors, Fonts } from "~/theme";

const center = { lat: 50.4503596, lng: 30.5245025 };

type Props = {
  onSelect?: (v: {
    lat: Point["lat"];
    lng: Point["lng"];
    address: GooglePlaceData["description"];
  }) => void;
};

const GOOGLE_PLACES_API_KEY = "AIzaSyDX8bQm6Kkh-s3ofNDRJTPiLx1o6UbxYag";

export default function LocationSearch({ onSelect }: Props) {
  const theme = useThemeColor();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
        }}
        fetchDetails={true}
        debounce={400}
        onPress={(data, details) => {
          const location = details?.geometry.location;
          logger(location);
          if (location) {
            const target = {
              lat: location.lat,
              lng: location.lng,
              address: data.description,
            };
            const isInRadius = isPointWithinRadius(target, center, 19900);
            console.log({ isInRadius });

            onSelect?.(target);
          }
        }}
        placeholder='Search location'
        styles={{
          textInput: styles.input,
          separator: { height: 1 },
        }}
      />
    </View>
  );
}

const styling = (t: ThemeColor) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: moderateScale(20),
    },
    input: {
      height: moderateScale(46),
      paddingHorizontal: moderateScale(12),
      color: Colors[t].tSearch,
      backgroundColor: Colors[t].bgSearch,
      fontFamily: Fonts.SF_PRO_Regular,
      fontSize: moderateScale(18),
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: moderateScale(8),
    },
  });
