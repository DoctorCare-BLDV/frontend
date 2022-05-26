import React, {useCallback} from 'react';
import {StyleSheet, TextInputProps, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '@app/resources';
import {TextView} from '../label';
import {TextField} from './TextField';

interface InputWithTitleProps {
  title: string;
  onChangeText: (val: string) => void;
  type: 'input' | 'select';
  inputProps?: TextInputProps;
  requried?: boolean;
  disabled?: boolean;
}

export const InputWithTitle: React.FC<InputWithTitleProps> = React.memo(
  props => {
    const {title, onChangeText, type, inputProps, requried, disabled} = props;

    const renderContent = useCallback(() => {
      if (type === 'input')
        return (
          <TextField
            containerStyle={[
              styles.inputWrapper,
              disabled ? styles.disabledInput : {},
            ]}
            inputProps={{
              ...inputProps,
              style: styles.input,
              editable: !disabled,
              placeholder: 'Vui lòng nhập...',
              placeholderTextColor: Colors.GRAY,
              onChangeText: onChangeText,
            }}
          />
        );
      return (
        <View style={styles.selectWrapper}>
          <TextView style={styles.selectValue}>{''}</TextView>
          <FontAwesome5Icon name="chevron-right" />
        </View>
      );
    }, [inputProps, onChangeText, type, disabled]);

    return (
      <View style={styles.container}>
        <TextView style={styles.title}>
          {title}
          {requried && <TextView style={styles.required}>{' *'}</TextView>}
        </TextView>
        {renderContent()}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  required: {
    color: Colors.PRIMARY_RED,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  disabledInput: {
    backgroundColor: Colors.MEDIUM_GRAY,
  },
  inputWrapper: {
    backgroundColor: Colors.LIGHT_GRAY_4,
    borderRadius: 15,
    height: 40,
    justifyContent: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  selectWrapper: {
    backgroundColor: Colors.LIGHT_GRAY_4,
    borderRadius: 15,
    height: 40,
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  selectValue: {
    flex: 1,
  },
  input: {
    height: 40,
  },
});
