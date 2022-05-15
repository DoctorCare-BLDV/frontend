import {useTheme} from '@app/shared/hooks/useTheme';
import React, {useMemo} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';

import {Input, InputProps} from '../../input';
import {TextView} from '../../label';

export interface FormInputProps extends InputProps {
  label?: string;
  labelContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  labelStyle,
  style,
  containerStyle,
  labelContainerStyle,
  inputContainerStyle,
  ...props
}) => {
  const theme = useTheme();

  const containerBaseStyle = useMemo(() => {
    return [styles.container, containerStyle];
  }, [containerStyle]);

  const labelContainerBaseStyle = useMemo(() => {
    return [styles.labelContainer, labelContainerStyle];
  }, [labelContainerStyle]);

  const labelBaseStyle = useMemo(() => {
    return [styles.label, labelStyle];
  }, [labelStyle]);

  const inputContainerBaseStyle = useMemo(() => {
    return [
      styles.inputContainer,
      {
        backgroundColor: theme.colorScheme.background,
      },
      inputContainerStyle,
    ];
  }, [inputContainerStyle, theme]);

  const inputBaseStyle = useMemo(() => {
    return [styles.input, style];
  }, [style]);

  return (
    <View style={containerBaseStyle}>
      <View style={labelContainerBaseStyle}>
        <TextView style={labelBaseStyle}>{label}</TextView>
      </View>
      <View style={inputContainerBaseStyle}>
        <Input {...props} style={inputBaseStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  labelContainer: {
    height: 35,
    justifyContent: 'center',
  },
  label: {
    marginRight: 10,
  },
  inputContainer: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    paddingHorizontal: 0,
  },
});
