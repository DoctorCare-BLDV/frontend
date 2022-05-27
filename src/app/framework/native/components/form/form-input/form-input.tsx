import {useTheme} from '@app/shared/hooks/useTheme';
import React, {useMemo} from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

import {Input, InputProps} from '../../input';
import {TextView} from '../../label';

export interface FormInputProps extends InputProps {
  label?: string;
  labelContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPressInput?: () => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  labelStyle,
  style,
  containerStyle,
  labelContainerStyle,
  inputWrapperStyle,
  onPressInput,
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
    ];
  }, [theme]);

  const inputBaseStyle = useMemo(() => {
    return [styles.input, style];
  }, [style]);

  return (
    <View style={containerBaseStyle}>
      <View style={labelContainerBaseStyle}>
        <TextView style={labelBaseStyle}>{label}</TextView>
      </View>
      <View style={[styles.inputWrapper, inputWrapperStyle]}>
        <TouchableOpacity
          onPress={onPressInput}
          style={inputContainerBaseStyle}>
          <View pointerEvents={onPressInput ? 'none' : 'auto'}>
            <Input {...props} style={inputBaseStyle} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  labelContainer: {
    minHeight: 35,
    justifyContent: 'center',
  },
  label: {
    marginRight: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  inputContainer: {
    borderRadius: 8,
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  input: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 8,
    width: '100%',
  },
});
