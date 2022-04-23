import React, {useMemo} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

import {useTheme} from '@app/shared/hooks/useTheme';

export interface InputProps extends TextInputProps {}

export const Input: React.FC<InputProps> = ({
  placeholderTextColor,
  style,
  ...props
}) => {
  const theme = useTheme();

  const placeholderTextColorBase = useMemo(() => {
    return placeholderTextColor || theme.textColorScheme.tertiary;
  }, [placeholderTextColor, theme]);

  const styleBase = useMemo(() => {
    return [
      styles.input,
      {
        color: theme.textColorScheme.primary,
      },
      style,
    ];
  }, [style, theme]);

  return (
    <TextInput
      {...props}
      style={styleBase}
      placeholderTextColor={placeholderTextColorBase}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 0,
  },
});
