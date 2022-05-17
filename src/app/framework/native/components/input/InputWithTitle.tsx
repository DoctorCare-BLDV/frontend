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
}

export const InputWithTitle: React.FC<InputWithTitleProps> = React.memo(
  props => {
    const {title, onChangeText, type, inputProps} = props;

    const renderContent = useCallback(() => {
      if (type === 'input')
        return (
          <TextField
            containerStyle={styles.inputWrapper}
            inputProps={{
              ...inputProps,
              style: styles.input,
              placeholder: 'Vui lòng nhập...',
              placeholderTextColor: Colors.GRAY,
              onChangeText: onChangeText,
            }}
          />
        );
      return (
        <View style={styles.selectWrapper}>
          <TextView style={styles.selectValue}>{'asmdklasd'}</TextView>
          <FontAwesome5Icon name="chevron-right" />
        </View>
      );
    }, [inputProps, onChangeText, type]);

    return (
      <View style={styles.container}>
        <TextView style={styles.title}>
          {title}
          <TextView style={styles.required}>{' *'}</TextView>
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
  inputWrapper: {
    backgroundColor: Colors.SILVER_BACKGROUND,
    borderRadius: 15,
    height: 40,
    justifyContent: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  selectWrapper: {
    backgroundColor: Colors.SILVER_BACKGROUND,
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
