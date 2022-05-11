import React, {useCallback} from 'react';
import {
  Modal,
  ActivityIndicator,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface FullScreenLoadingIndicatorProps {
  visible: boolean;
  useModal?: boolean;

  containerStyle?: StyleProp<ViewStyle>;
}

const _FullScreenLoadingIndicator: React.FC<
  FullScreenLoadingIndicatorProps
> = ({visible, useModal = true, containerStyle = undefined}) => {
  const renderLoading = useCallback(
    (isVisible = true) => {
      return isVisible ? (
        <View
          style={[
            _styles.container,
            !useModal && _styles.noModalContainer,
            containerStyle,
          ]}>
          <View style={useModal && _styles.box}>
            <ActivityIndicator
              color={!useModal ? undefined : 'white'}
              size="large"
            />
          </View>
        </View>
      ) : null;
    },
    [useModal, containerStyle],
  );

  return useModal ? (
    <Modal visible={visible} animationType="fade" transparent>
      {renderLoading(true)}
    </Modal>
  ) : (
    renderLoading(visible)
  );
};

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(51,51,51,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noModalContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: undefined,
    zIndex: 9999,
  },
  box: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: 'rgb(39,43,50)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const FullScreenLoadingIndicator = React.memo(
  _FullScreenLoadingIndicator,
);
