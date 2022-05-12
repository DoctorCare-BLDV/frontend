import React, {memo, useCallback, useEffect, useState} from 'react';

import {ConfirmationModal as ConfirmationModalComponent} from '@native/components';

import {ConfirmationModalProps} from './types';

const _ConfirmationModal = ({navigation, route}: ConfirmationModalProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 500);
  }, []);

  const handleModalHide = useCallback(() => {
    route.params?.onModalHide && route.params.onModalHide();
    navigation.goBack();
  }, [navigation, route.params]);

  const handleConfirm = useCallback(() => {
    route.params?.onConfirm && route.params.onConfirm();
    setVisible(false);
  }, [route.params]);

  const handleCancel = useCallback(() => {
    route.params?.onCancel && route.params?.onCancel();
    setVisible(false);
  }, [route.params]);

  return (
    <ConfirmationModalComponent
      {...route.params}
      visible={visible}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onModalHide={handleModalHide}
    />
  );
};

export const ConfirmationModal = memo(_ConfirmationModal);
