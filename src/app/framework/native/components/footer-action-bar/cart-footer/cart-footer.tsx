import React from 'react';
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
  return (
    <FooterActionBar
      type={FooterActionBarType.PRIMARY}
      iconLeftName="cart-plus"
      label={MESSAGES.LABEL}
      btnTitle={MESSAGES.BTN_TITLE}
      value={MESSAGES.VALUE}
      safeLayout
      onLabelPress={() => {}}
      {...props}
    />
  );
};
