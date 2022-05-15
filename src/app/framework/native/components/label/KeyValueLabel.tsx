import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {Divider} from 'react-native-elements';
import {Colors} from '@app/resources';

export interface KeyValueLabelProps extends TextProps {
  keyLabel: string;
  valueLabel: string;
  containerStyle?: StyleProp<ViewStyle>;
  keyStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  divider?: number;
  multiline?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}

const _KeyValueLabel: React.FC<KeyValueLabelProps> = props => {
  const {
    keyLabel,
    valueLabel,
    containerStyle,
    valueStyle,
    keyStyle,
    multiline,
    divider,
    onPress,
    disabled,
  } = props;

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        disabled={disabled}
        style={[_styles.container, containerStyle]}>
        <Text style={[_styles.key, keyStyle]}>{keyLabel}</Text>
        <Text
          style={[_styles.label, valueStyle]}
          numberOfLines={multiline ? undefined : 1}>
          {valueLabel}
        </Text>
      </TouchableOpacity>
      {divider && (
        <Divider
          style={_styles.divider}
          color={Colors.SILVER_BACKGROUND}
          width={divider}
        />
      )}
    </>
  );
};

const _styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  key: {
    color: Colors.BLACK,
    fontSize: 14,
  },
  label: {
    flex: 1,
    marginLeft: 32,
    textAlign: 'right',
  },
  divider: {
    height: 1,
  },
});

export const KeyValueLabel = React.memo(_KeyValueLabel);
