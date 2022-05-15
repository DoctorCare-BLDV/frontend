import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';

import {useIsFocused, useNavigation} from '@react-navigation/native';

import {CarNavigationProps} from '@app/framework/native/containers/private/cart/cart.type';
import {useFloatingReaction} from '@app/shared/contexts';

import {IconButton} from '../../icon-button';

export interface CartButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
}

export const CartButton: React.FC<CartButtonProps> = ({
  containerStyle,
  iconStyle,
}) => {
  const cartRef = useRef();
  const {setFloatingReactionTarget} = useFloatingReaction();
  const isFocused = useIsFocused();
  const cartNavigation = useNavigation<CarNavigationProps>();

  const iconBaseStyle = useMemo(() => {
    return [styles.icon, iconStyle];
  }, [iconStyle]);

  useEffect(() => {
    if (cartRef.current && isFocused) {
      // @ts-ignore
      cartRef.current.measure((x, y, width, height, pageX, pageY) => {
        setFloatingReactionTarget({
          x: pageX,
          y: pageY,
          width,
          height,
        });
      });
    }
  }, [isFocused, setFloatingReactionTarget]);

  const goToCart = useCallback(() => {
    cartNavigation.navigate('Cart');
  }, [cartNavigation]);

  return (
    <IconButton
      ref={cartRef}
      name="shopping-cart"
      style={iconBaseStyle}
      containerStyle={containerStyle}
      onPress={goToCart}
    />
  );
};

const styles = StyleSheet.create({
  icon: {},
});
