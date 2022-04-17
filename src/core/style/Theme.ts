import {TextTheme} from './TextTheme';
import {ColorScheme} from './ColorScheme';
import {TextColorScheme} from './TextColorScheme';

export enum ThemeConfig {
  Dark,
  Light,
  System,
}

export interface Theme {
  textTheme?: TextTheme;
  colorScheme: ColorScheme;
  textColorScheme: TextColorScheme;
}
