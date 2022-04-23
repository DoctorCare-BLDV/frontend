import React from 'react';
import {View, StyleSheet} from 'react-native';

export interface TextProps {}

export const Text: React.FC<TextProps> = props => {
  const {} = props;
  return <View style={StyleSheet.flatten([styles.container])} />;
};

const styles = StyleSheet.create({
  container: {},
});
