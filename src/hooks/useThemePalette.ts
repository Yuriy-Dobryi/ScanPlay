import { Colors } from '~/theme';
import useTheme from './useTheme';

const useThemePalette = () => {
  const theme = useTheme();
  return { colors: Colors[theme] };
};

export default useThemePalette;
