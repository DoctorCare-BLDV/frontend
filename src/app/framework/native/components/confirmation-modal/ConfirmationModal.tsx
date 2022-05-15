import React, {memo, useCallback, useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

import ReactNativeModal from 'react-native-modal';

import {TextView} from '@native/components';
import {Colors, Layout} from '@app/resources';
import {useTheme} from '@app/shared/hooks/useTheme';

export enum ConfirmationModalType {
  NORMAL = 'normal',
  DANGER = 'danger',
}

export interface ConfirmationModalProps {
  visible?: boolean;
  title?: string;
  content?: string;
  type?: ConfirmationModalType;
  cancelTitle?: string;
  confirmTitle?: string;

  onConfirm?: () => void;
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
    fontSize: 20,
    paddingBottom: Layout.spacingHorizontal,
    fontWeight: '600',
  },
  danger: {
    color: Colors.DANGER,
  },
  content: {
    textAlign: 'center',
    paddingBottom: Layout.spacingHorizontal / 2,
  },

  btnComboContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    marginTop: Layout.spacingHorizontal,
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

const _ConfirmationModal = ({
  visible,
  title = '',
  content = '',
  type = ConfirmationModalType.NORMAL,
  cancelTitle = MESSAGES.CANCEL,
  confirmTitle = MESSAGES.CONFIRM,

  onConfirm = () => {},
  onCancel = () => {},
  onModalHide = () => {},
}: ConfirmationModalProps) => {
  const theme = useTheme();

  const handlePressConfirm = useCallback(() => {
    onConfirm();
  }, [onConfirm]);

  const containerStyle = useMemo(() => {
    return [
      styles.container,
      {
        backgroundColor: theme.colorScheme.surface,
      },
    ];
  }, [theme]);

  const titleStyle = useMemo(() => {
    const titleStyles: StyleProp<TextStyle> = [styles.title];
    switch (type) {
      case ConfirmationModalType.DANGER:
        break;
    }
    return titleStyles;
  }, [type]);

  const btnComboContainerStyle = useMemo(() => {
    return [
      styles.btnComboContainer,
      {
        borderColor: theme.colorScheme.border,
      },
    ];
  }, [theme]);

  const btnCancelLabelStyle = useMemo(() => {
    return [
      styles.btnCancelLabel,
      {
        color: theme.colorScheme.inactive,
      },
    ];
  }, [theme]);

  const btnConfirmLabelStyle = useMemo(() => {
    const btnConfirmLabelStyles: StyleProp<TextStyle> = [
      styles.btnConfirmLabel,
      {
        color: theme.colorScheme.primary,
      },
    ];
    switch (type) {
      case ConfirmationModalType.DANGER:
        btnConfirmLabelStyles.push(styles.danger);
        break;
    }
    return btnConfirmLabelStyles;
  }, [type, theme]);

  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={onCancel}
      backdropOpacity={0.6}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      onModalHide={onModalHide}>
      <View style={containerStyle}>
        {!!title && <TextView style={titleStyle}>{title}</TextView>}
        {!!content && <TextView style={styles.content}>{content}</TextView>}

        <View style={btnComboContainerStyle}>
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
    </ReactNativeModal>
  );
};

export const ConfirmationModal = memo(_ConfirmationModal);
