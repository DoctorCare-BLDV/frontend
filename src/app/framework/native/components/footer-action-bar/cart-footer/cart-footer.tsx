import React, {useEffect, useRef} from 'react';
import {useFloatingReaction} from '@app/shared/contexts';
import {useIsFocused} from '@react-navigation/native';
import {
  FooterActionBar,
  FooterActionBarProps,
  FooterActionBarType,
} from '../footer-action-bar';

export interface CartFooterProps extends FooterActionBarProps {}

const MESSAGES = {
  LABEL: 'Thêm vào giỏ',
  BTN_TITLE: 'Mua hàng',
  VALUE: '40.000.000đ',
};

export const CartFooter: React.FC<CartFooterProps> = props => {
  const isFocused = useIsFocused();
  const labelBlockRef = useRef();
  const {setFloatingReactionTarget} = useFloatingReaction();

  useEffect(() => {
    if (isFocused && labelBlockRef.current) {
      // @ts-ignore
      labelBlockRef.current.measure((x, y, width, height, pageX, pageY) => {
        setFloatingReactionTarget({
          x: pageX,
          y: pageY,
          width,
          height,
        });
      });
    }
  }, [isFocused, setFloatingReactionTarget]);

  return (
    <FooterActionBar
      type={FooterActionBarType.PRIMARY}
      iconLeftName="cart-plus"
      label={MESSAGES.LABEL}
      btnTitle={MESSAGES.BTN_TITLE}
      value={MESSAGES.VALUE}
      safeLayout
      onLabelPress={() => {}}
      labelBlockRef={labelBlockRef}
      {...props}
    />
  );
};
