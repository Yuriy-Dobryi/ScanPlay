import { Colors } from "~/theme";
import useThemeColor from "./useThemeColor";

const useThemePalette = () => {
  const theme = useThemeColor();
  return { colors: Colors[theme] };
};

export default useThemePalette;
