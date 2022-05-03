import React, {useMemo} from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';

import {useTheme} from '@app/shared/hooks/useTheme';
import {TextView} from '../label';

export interface TagProps {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const Tag: React.FC<TagProps> = ({
  label,
  containerStyle,
  labelStyle,
}) => {
  const theme = useTheme();

  const containerBaseStyle = useMemo(() => {
    return [
      styles.container,
      {
        backgroundColor: theme.colorScheme.primary,
      },
      containerStyle,
    ];
  }, [theme, containerStyle]);

  const labelBaseStyle = useMemo(() => {
    return [
      styles.label,
      {
        color: theme.colorScheme.onPrimary,
      },
      labelStyle,
    ];
  }, [theme, labelStyle]);

  if (!label) {
    return null;
  }

  return (
    <View style={containerBaseStyle}>
      <TextView style={labelBaseStyle}>{label}</TextView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
    borderTopRightRadius: 0,
  },
  label: {
    fontSize: 9,
  },
});
