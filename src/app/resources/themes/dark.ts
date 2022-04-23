import {Theme} from '@core';
import {Colors} from '../values';

export const DarkTheme: Theme = {
  colorScheme: {
    primary: Colors.RED,
    secondary: Colors.BLUE,
    onSecondary: Colors.WHITE,
    background: Colors.LIGHT_GRAY_2,
    surface: Colors.WHITE,
    error: Colors.PURPLE,
    onBackground: Colors.BLACK,
    onError: Colors.WHITE,
    onPrimary: Colors.WHITE,
    onSurface: Colors.BLACK,
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
