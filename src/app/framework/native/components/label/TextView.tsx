import {LightTheme} from '@app/resources';
import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

export interface TextViewProps extends TextProps {
  text?: string;
  color?: string;
}

const _TextView: React.FC<TextViewProps> = props => {
  return (
    <Text
      {...props}
      style={StyleSheet.flatten([
        {color: props.color || LightTheme.textColorScheme.primary},
        props.style,
      ])}>
      {props.text || props.children}
    </Text>
  );
};

export const TextView = React.memo(_TextView);
