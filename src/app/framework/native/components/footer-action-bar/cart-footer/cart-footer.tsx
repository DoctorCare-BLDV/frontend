import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import {useCart, useFloatingReaction} from '@app/shared/contexts';
import {useIsFocused} from '@react-navigation/native';
import {vndCurrencyFormat} from '@app/resources';

import {
  FooterActionBar,
  FooterActionBarProps,
  FooterActionBarType,
} from '../footer-action-bar';
import {CartButton} from '../../header-button';

export interface CartFooterProps extends FooterActionBarProps {}

const MESSAGES = {
  LABEL: 'Thêm vào giỏ',
  BTN_TITLE: 'Mua hàng',
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginLeft: 12,
  },
});

export const CartFooter: React.FC<CartFooterProps> = props => {
  const isFocused = useIsFocused();
  const labelBlockRef = useRef();
  const {cartTotalPrice} = useCart();
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

  const renderCart = useCallback(() => {
    return (
      <View pointerEvents="none">
        <CartButton />
      </View>
    );
  }, []);

  return (
    <FooterActionBar
      type={FooterActionBarType.PRIMARY}
      iconLeftName="cart-plus"
      renderIconLeft={renderCart}
      btnTitle={MESSAGES.BTN_TITLE}
      label={vndCurrencyFormat(cartTotalPrice)}
      labelStyle={styles.label}
      safeLayout
      labelBlockRef={labelBlockRef}
      {...props}
    />
  );
};
