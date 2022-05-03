import React, {useCallback, useMemo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacityProps,
  View,
} from 'react-native';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {useTheme} from '@app/shared/hooks/useTheme';
import {TextView} from '../label';

export enum IconButtonType {
  PRIMARY = 'primary',
  CANCEL = 'cancel',
  DISABLED = 'disabled',
}

export interface IconButtonProps extends TouchableOpacityProps {
  name: string;
  solid?: boolean;
  type?: IconButtonType;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  badge?: string | number;
}

export const IconButton: React.FC<IconButtonProps> = ({
  name,
  type = IconButtonType.PRIMARY,
  containerStyle,
  style,
  badge,
  solid = true,
  ...props
}) => {
  const theme = useTheme();

  const iconStyle = useMemo(() => {
    const baseStyle: StyleProp<TextStyle> = [styles.icon];

    switch (type) {
      case IconButtonType.PRIMARY:
        baseStyle.push({color: theme.colorScheme.primary});
        break;
      case IconButtonType.CANCEL:
        baseStyle.push({color: theme.colorScheme.onBackground});
        break;
      case IconButtonType.DISABLED:
        baseStyle.push({color: theme.colorScheme.inactive});
        break;
    }

    return [baseStyle, style];
  }, [style, theme, type]);

  const renderBadge = useCallback(() => {
    if (!badge) {
      return null;
    }

    return (
      <View
        style={[
          styles.badgeContainer,
          {backgroundColor: theme.colorScheme.primary},
        ]}>
        <TextView style={[styles.badge, {color: theme.colorScheme.onPrimary}]}>
          {badge}
        </TextView>
      </View>
    );
  }, [theme, badge]);

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.container, containerStyle])}
      {...props}>
      <FontAwesome5Icon solid={solid} name={name} style={iconStyle} />
      {renderBadge()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  icon: {
    fontSize: 20,
  },
  badgeContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: -6,
    right: -6,
    minWidth: 12,
    height: 12,
    borderRadius: 12,
    paddingHorizontal: 2,
  },
  badge: {
    fontSize: 7,
  },
});
