import {useColorScheme} from 'react-native';

import {LightTheme, DarkTheme} from '@app/resources';

export function useTheme() {
  const systemColorScheme = useColorScheme();
  if (systemColorScheme === 'dark') {
    return DarkTheme;
  }
  return LightTheme;
}
