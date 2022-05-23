import React from 'react';
import {
  StyleSheet,
  TextProps,
  View,
  ImageSourcePropType,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {TextView} from './TextView';

export interface IconLabelProps extends TextProps {
  prefix?: React.ReactNode;
  prefixIcon?: ImageSourcePropType;
  text?: string;
  suffix?: React.ReactNode;
  suffixIcon?: ImageSourcePropType;

  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const _IconLabel: React.FC<IconLabelProps> = props => {
  const {
    prefixIcon,
    text,
    containerStyle,
    labelStyle,
    prefix,
    suffix,
    suffixIcon,
  } = props;
  const renderPrefix = () => {
    if (prefix) {
      return prefix;
    }
    if (prefixIcon) {
      return <Image source={prefixIcon} />;
    }
    return null;
  };
  const renderSuffix = () => {
    if (suffix) {
      return suffix;
    }
    if (suffixIcon) {
      return <Image source={suffixIcon} />;
    }
    return null;
  };
  return (
    <View style={[_styles.container, containerStyle]}>
      {renderPrefix()}
      <TextView style={[_styles.label, labelStyle]}>{text}</TextView>
      {renderSuffix()}
    </View>
  );
};

const _styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    marginHorizontal: 8,
  },
});

export const IconLabel = React.memo(_IconLabel);
