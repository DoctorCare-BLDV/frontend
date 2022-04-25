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

export interface FlatButtonProps extends TextProps {
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  hitSlop?: any;
}

const _FlatButton: React.FC<FlatButtonProps> = props => {
  const {title, onPress, hitSlop} = props;
  return (
    <TouchableOpacity
      hitSlop={hitSlop}
      onPress={onPress}
      style={StyleSheet.flatten([_styles.container, props.containerStyle])}>
      <Text style={StyleSheet.flatten([_styles.title, props.textStyle])}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const _styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
  },
});

export const FlatButton = React.memo(_FlatButton);
