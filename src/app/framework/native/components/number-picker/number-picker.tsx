import React, {useCallback, useMemo, useState} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {Layout} from '@app/resources';

import {TextView} from '../label';
import {IconButton} from '../icon-button';
import {InputModal} from '../input-modal';

export interface NumberPickerProps {
  value: number;
  min?: number;
  max?: number;
  containerStyle?: StyleProp<ViewStyle>;
  valueContainerStyle?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<TextStyle>;
  onChange?: (number: number) => void;
}

const MESSAGES = {
  CONFIRM: 'Xong',
  QUANTITY: 'Số lượng',
};

export const NumberPicker: React.FC<NumberPickerProps> = ({
  value = 0,
  containerStyle,
  valueContainerStyle,
  valueStyle,
  min = 0,
  max = Infinity,
  onChange = () => {},
}) => {
  const [isShowQuantityModal, setShowQuantityModal] = useState(false);

  const containerBaseStyle = useMemo(() => {
    return [styles.container, containerStyle];
  }, [containerStyle]);

  const quantityContainerBaseStyle = useMemo(() => {
    return [styles.quantityContainer, valueContainerStyle];
  }, [valueContainerStyle]);

  const quantityBaseStyle = useMemo(() => {
    return [styles.quantity, valueStyle];
  }, [valueStyle]);

  const isDecreaseDisabled = useMemo(() => {
    return typeof min === 'number' && value <= min;
  }, [min, value]);

  const isIncreaseDisabled = useMemo(() => {
    return typeof max === 'number' && value >= max;
  }, [max, value]);

  const showModal = useCallback(() => {
    setShowQuantityModal(true);
  }, []);

  const hideModal = useCallback(() => {
    setShowQuantityModal(false);
  }, []);

  const handleConfirm = useCallback(
    number => {
      onChange(Math.min(Math.max(Number(number) || 0, min), max));
      hideModal();
    },
    [onChange, hideModal, min, max],
  );

  const handlePressQuantity = useCallback(() => {
    showModal();
  }, [showModal]);

  const decrease = useCallback(() => {
    onChange(isDecreaseDisabled ? min : value - 1);
  }, [value, min, isDecreaseDisabled, onChange]);

  const increase = useCallback(() => {
    onChange(isIncreaseDisabled ? max : value + 1);
  }, [value, max, isIncreaseDisabled, onChange]);

  return (
    <>
      <View style={containerBaseStyle}>
        <IconButton
          disabled={isDecreaseDisabled}
          hitSlop={Layout.hitSlop}
          name="minus-square"
          solid={!isDecreaseDisabled}
          style={styles.icon}
          onPress={decrease}
        />
        <TouchableOpacity
          style={quantityContainerBaseStyle}
          onPress={handlePressQuantity}>
          <TextView style={quantityBaseStyle}>{value}</TextView>
        </TouchableOpacity>
        <IconButton
          disabled={isIncreaseDisabled}
          hitSlop={Layout.hitSlop}
          name="plus-square"
          solid={!isIncreaseDisabled}
          style={styles.icon}
          onPress={increase}
        />
      </View>

      <InputModal
        visible={isShowQuantityModal}
        title={MESSAGES.QUANTITY}
        text={String(value || '')}
        onCancel={hideModal}
        onConfirm={handleConfirm}
        confirmTitle={MESSAGES.CONFIRM}
        style={styles.input}
        keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    paddingHorizontal: Layout.spacingHorizontal,
  },
  quantity: {
    minWidth: 40,
    textAlign: 'center',
  },
  icon: {
    fontSize: 22,
  },

  modal: {},
  input: {
    textAlign: 'center',
  },
});
