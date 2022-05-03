import React, {memo, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  Switch,
  TouchableHighlight,
  TextStyle,
  View,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Colors, Layout} from '@app/resources';
import {hexToRgba} from '@app/utils';

import {TextView} from '../label';
import {useTheme} from '@app/shared/hooks/useTheme';

export enum RowItemType {
  NORMAL = 'normal',
  CHECK_BOX = 'check_box',
  SWITCH = 'switch',
}

export type RowItemData = {
  id: number;
  itemCode?: string;
  itemName?: string;
  type?: RowItemType;
  label?: string;
  value?: string;
  checked?: boolean;
  description?: string;
  key?: number;
};

export interface RowItemProps {
  type?: RowItemType;

  wrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  value?: string;
  valueStyle?: StyleProp<TextStyle>;

  disabled?: boolean;
  checked?: boolean;

  renderLabel?: () => JSX.Element;
  renderValue?: () => JSX.Element;

  onPress?: () => void;
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 0.5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 5,
  },
  label: {
    flex: 1,
    paddingHorizontal: Layout.spacingHorizontal,
    paddingVertical: 12,
  },
  value: {
    paddingHorizontal: Layout.spacingHorizontal,
  },
  icon: {
    fontSize: 20,
    paddingHorizontal: Layout.spacingHorizontal,
  },
  iconChecked: {},

  switchContainer: {
    transform: [{scale: 0.7}],
  },
});

const _RowItem: React.FC<RowItemProps> = ({
  type = RowItemType.NORMAL,

  label = '',
  value = '',
  labelStyle = undefined,
  valueStyle = undefined,
  wrapperStyle: wrapperStyleProp = undefined,
  containerStyle = undefined,

  disabled = undefined,
  checked = false,

  renderLabel: renderLabelProp = undefined,
  renderValue: renderValueProp = undefined,
  onPress = () => {},
}) => {
  const theme = useTheme();

  const wrapperStyle = useMemo(() => {
    return [
      styles.wrapper,
      {
        borderColor: theme.colorScheme.border,
      },
      wrapperStyleProp,
    ];
  }, [theme, wrapperStyleProp]);

  const iconStyle = useMemo(() => {
    return [
      styles.icon,
      {
        color: theme.textColorScheme.secondary,
      },
    ];
  }, [theme]);

  const iconCheckedStyle = useMemo(() => {
    return [
      {
        color: theme.colorScheme.primary,
      },
    ];
  }, [theme]);

  const renderLabel = useCallback(() => {
    return renderLabelProp ? (
      renderLabelProp()
    ) : (
      <TextView style={[styles.label, labelStyle]}>{label}</TextView>
    );
  }, [labelStyle, renderLabelProp, label]);

  const renderValue = useCallback(() => {
    if (renderValueProp) {
      return renderValueProp();
    }
    switch (type) {
      case RowItemType.NORMAL:
        return <TextView style={[styles.value, valueStyle]}>{value}</TextView>;
      case RowItemType.CHECK_BOX:
        return (
          <Ionicons
            name={checked ? 'checkbox' : 'square-outline'}
            style={[iconStyle, checked && iconCheckedStyle]}
          />
        );
      case RowItemType.SWITCH:
        return (
          <Switch
            thumbColor={
              Platform.OS === 'android'
                ? checked
                  ? theme.colorScheme.primary
                  : theme.colorScheme.inactive
                : undefined
            }
            trackColor={{
              true:
                Platform.OS === 'android'
                  ? hexToRgba(theme.colorScheme.primary, 0.6)
                  : theme.colorScheme.primary,
            }}
            style={styles.switchContainer}
            onValueChange={onPress}
            value={checked}
          />
        );
    }
  }, [
    type,
    valueStyle,
    checked,
    renderValueProp,
    value,
    theme,
    onPress,
    iconStyle,
    iconCheckedStyle,
  ]);

  return (
    <TouchableHighlight
      disabled={disabled !== undefined ? disabled : type === RowItemType.SWITCH}
      activeOpacity={0.7}
      underlayColor={theme.colorScheme.underlay}
      style={wrapperStyle}
      onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        {renderLabel()}
        {renderValue()}
      </View>
    </TouchableHighlight>
  );
};

export const RowItem = memo(_RowItem);
