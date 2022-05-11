import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

import ReactNativeModal from 'react-native-modal';

import {TextView} from '@native/components';
import {Layout} from '@app/resources';
import {useTheme} from '@app/shared/hooks/useTheme';

export interface InputModalProps extends TextInputProps {
  visible?: boolean;
  text?: string;
  title?: string;
  cancelTitle?: string;
  confirmTitle?: string;
  formatter?: (value: string) => string;

  onConfirm?: (text: string) => void;
  onCancel?: () => void;
  onModalHide?: () => void;
}

const MESSAGES = {
  CANCEL: 'Huỷ',
  CONFIRM: 'Ok',
};

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacingHorizontal,
    paddingBottom: 0,
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: Layout.spacingHorizontal,
    fontWeight: 'bold',
  },
  input: {
    padding: 5,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 4,
    textAlignVertical: 'top',
    fontSize: 16,
  },

  btnComboContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacingHorizontal,
    flex: 1,
  },
  btnCancelLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnConfirmLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const _InputModal = ({
  visible,
  text: textProp = '',
  title = '',
  cancelTitle = MESSAGES.CANCEL,
  confirmTitle = MESSAGES.CONFIRM,

  formatter = value => value,
  onConfirm = () => {},
  onCancel = () => {},
  onModalHide = () => {},
  ...props
}: InputModalProps) => {
  const refInput = useRef<any>();

  const theme = useTheme();

  const [text, setText] = useState(textProp || '');

  useEffect(() => {
    setText(textProp);
  }, [textProp]);

  const containerStyle = useMemo(() => {
    return [
      styles.container,
      {
        backgroundColor: theme.colorScheme.background,
      },
    ];
  }, [theme]);

  const inputBaseStyle = useMemo(() => {
    return [
      styles.input,
      {
        color: theme.textColorScheme.primary,
        borderColor: theme.colorScheme.border,
        backgroundColor: theme.colorScheme.border,
      },
      props.style,
    ];
  }, [theme, props.style]);

  const btnCancelLabelStyle = useMemo(() => {
    return [
      styles.btnCancelLabel,
      {
        color: theme.textColorScheme.tertiary,
      },
    ];
  }, [theme]);

  const btnConfirmLabelStyle = useMemo(() => {
    return [
      styles.btnConfirmLabel,
      {
        color: theme.colorScheme.primary,
      },
    ];
  }, [theme]);

  const handleShow = useCallback(() => {
    Keyboard.dismiss();
    if (visible) {
      refInput.current && refInput.current.focus();
    }
  }, [visible]);

  const handleChangeText = useCallback(
    (value: string) => {
      setText(formatter(value));
    },
    [formatter],
  );

  const handlePressConfirm = useCallback(() => {
    onConfirm(text);
  }, [text, onConfirm]);

  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={onCancel}
      onShow={handleShow}
      backdropOpacity={0.6}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      onModalHide={onModalHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        keyboardVerticalOffset={100}>
        <View style={containerStyle}>
          {!!title && <TextView style={styles.title}>{title}</TextView>}
          <TextInput
            value={text}
            onChangeText={handleChangeText}
            onSubmitEditing={handlePressConfirm}
            {...props}
            ref={refInput}
            style={inputBaseStyle}
          />
          <View style={styles.btnComboContainer}>
            <TouchableOpacity style={styles.btnContainer} onPress={onCancel}>
              <TextView style={btnCancelLabelStyle}>{cancelTitle}</TextView>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={handlePressConfirm}>
              <TextView style={btnConfirmLabelStyle}>{confirmTitle}</TextView>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ReactNativeModal>
  );
};

export const InputModal = memo(_InputModal);
