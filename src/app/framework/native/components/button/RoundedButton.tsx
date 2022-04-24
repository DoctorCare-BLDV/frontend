import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export interface RoundedButtonProps extends TextProps {
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  color?: string[];
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  loadingColor?: string;
  onPress?: () => void;
  disabled?: boolean;
}

const _RoundedButton: React.FC<RoundedButtonProps> = props => {
  const {title, onPress, color, loadingColor, loading = true, disabled} = props;

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          animating={loading}
          color={loadingColor || '#fff'}
          size="small"
        />
      );
    }
    return (
      <Text style={StyleSheet.flatten([_styles.title, props.textStyle])}>
        {title}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={onPress}
      style={StyleSheet.flatten([_styles.container, props.containerStyle])}>
      <LinearGradient
        colors={color || ['#EE4E9B', '#D06767']}
        style={_styles.linear}>
        {renderContent()}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const _styles = StyleSheet.create({
  container: {
    height: 44,
  },
  linear: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    color: 'white',
    fontWeight: '600',
  },
});

export const RoundedButton = React.memo(_RoundedButton);
