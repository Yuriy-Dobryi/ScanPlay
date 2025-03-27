import { moderateScale } from "react-native-size-matters";
import Fonts from "./fonts";

const typography = {
  title: {
    fontSize: moderateScale(18),
    // lineHeight: 32,
    fontFamily: Fonts.SF_PRO_Bold,
  },
  "text-m": {
    fontSize: 16,
    // lineHeight: 24,
    // fontFamily: "Montserrat",
  },
  "text-s": {
    fontSize: 14,
    // lineHeight: 21,
    // fontFamily: "Montserrat",
  },
  "text-xs": {
    fontSize: 12,
    // lineHeight: 15,
    // fontFamily: "Montserrat",
  },
};

export default typography;
