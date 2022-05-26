import React, {memo, useMemo} from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
} from 'react-native';

import {useTheme} from '@app/shared/hooks/useTheme';

import {TextView} from '../label';

export enum HeaderButtonType {
  PRIMARY = 1,
  SECONDARY = 2,
}

export interface HeaderButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  type?: HeaderButtonType;
  label?: string;
  disabled?: boolean;
  children?: any;

  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryLabel: {},
  secondaryLabel: {},
});

const _HeaderButton: React.FC<HeaderButtonProps> = ({
  label = '',
  type = HeaderButtonType.PRIMARY,
  containerStyle = undefined,
  labelStyle: labelStyleProp = undefined,

  disabled = false,

  children = undefined,

  onPress = () => {},
}) => {
  const theme = useTheme();

  const labelStyle = useMemo(() => {
    let style: StyleProp<TextStyle> = [styles.label];
    switch (type) {
      case HeaderButtonType.PRIMARY:
        style.push([
          styles.primaryLabel,
          {
            color: theme.colorScheme.primary,
          },
        ]);
        break;
      case HeaderButtonType.SECONDARY:
        style.push([
          styles.secondaryLabel,
          {
            color: theme.colorScheme.secondary,
          },
        ]);
        break;
    }
    style.push(labelStyleProp);

    return style;
  }, [type, labelStyleProp, theme]);

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      {children || <TextView style={labelStyle}>{label}</TextView>}
    </TouchableOpacity>
  );
};

export const HeaderButton = memo(_HeaderButton);
