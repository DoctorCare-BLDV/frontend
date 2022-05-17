import React, {useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {Colors} from '@app/resources';
import {useTheme} from '@app/shared/hooks/useTheme';

import {InputProps, Input} from '../input';

export interface SearchBarProps extends InputProps {
  iconRightName?: string;
  containerStyle?: StyleProp<ViewStyle>;
  iconRightStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  iconRightName = 'search',
  containerStyle,
  iconRightStyle,
  style,
  onPress,
  ...props
}) => {
  const theme = useTheme();

  const inputStyle = useMemo(() => {
    return [styles.input, style];
  }, [style]);

  const iconRightStyleBase = useMemo(() => {
    return [
      styles.iconRight,
      {
        color: theme.textColorScheme.tertiary,
      },
      iconRightStyle,
    ];
  }, [iconRightStyle, theme]);

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.container, containerStyle])}
      onPress={onPress}>
      <Input {...props} style={inputStyle} />
      <FontAwesomeIcon name={iconRightName} style={iconRightStyleBase} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SILVER_BACKGROUND,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  iconRight: {
    paddingRight: 12,
    fontSize: 16,
  },
});
