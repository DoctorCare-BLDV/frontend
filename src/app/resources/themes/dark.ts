import {Theme} from '@core';
import {Colors} from '../values';

export const DarkTheme: Theme = {
  colorScheme: {
    primary: Colors.BLUE,
    secondary: Colors.RED,
    onSecondary: Colors.WHITE,
    background: Colors.WHITE,
    surface: Colors.PURPLE,
    error: Colors.PURPLE,
    onBackground: Colors.BLACK,
    onError: Colors.WHITE,
    onPrimary: Colors.WHITE,
    onSurface: Colors.WHITE,
    inactive: Colors.GRAY,
    underlay: Colors.LIGHT_GRAY_1,
    overlay: Colors.OVERLAY,
    onOverlay: Colors.WHITE,
    border: Colors.LIGHT_GRAY,
  },
  textColorScheme: {
    primary: Colors.BLACK,
    secondary: Colors.GRAY,
    tertiary: '#4F4F4F',
  },
};
