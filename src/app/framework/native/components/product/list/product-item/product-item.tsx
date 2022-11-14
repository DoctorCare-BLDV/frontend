import React, {useCallback, useMemo, useRef} from 'react';
import {View, StyleSheet, StyleProp, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ImageStyle} from 'react-native-fast-image';

import {Colors, Layout, pointFormat, vndCurrencyFormat} from '@app/resources';
import {useTheme} from '@app/shared/hooks/useTheme';
import {useCart, useFloatingReaction} from '@app/shared/contexts';
import {ProductData} from '@data/models';
import {ProductDetailNavigationProps} from '@app/framework/native/containers';

import {Image} from '../../../image';
import {TextView} from '../../../label';
import {IconButton} from '../../../icon-button';
import {Tag} from '../../../tag';

export interface ProductItemProps {
  product: ProductData;
  imageStyle?: StyleProp<ImageStyle>;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  imageStyle = {},
}) => {
  const theme = useTheme();
  const {setCartProduct} = useCart();
  const productDetailNavigation = useNavigation<ProductDetailNavigationProps>();
  const {addFloatingReactionSource} = useFloatingReaction();
  const imageRef = useRef();

  const {name, sellPrice, point, image} = useMemo(() => {
    return product;
  }, [product]);

  const wrapperStyle = useMemo(() => {
    return [
      styles.wrapper,
      {
        backgroundColor: theme.colorScheme.surface,
      },
    ];
  }, [theme]);

  const priceStyle = useMemo(() => {
    return [styles.price, {color: theme.colorScheme.primary}];
  }, [theme]);

  const blockStyle = useMemo(() => {
    return [styles.block, {borderColor: theme.colorScheme.border}];
  }, [theme]);

  const handlePressProduct = useCallback(() => {
    productDetailNavigation.navigate('ProductDetail', {
      product,
    });
  }, [productDetailNavigation, product]);

  const animateCart = useCallback(() => {
    if (imageRef.current) {
      const ELEMENT_WIDTH = 100;
      const ELEMENT_HEIGHT = 100;
      const elementStyle = {width: ELEMENT_WIDTH, height: ELEMENT_HEIGHT};
      const element = <Image source={{uri: image?.url}} style={elementStyle} />;

      // @ts-ignore
      imageRef.current.measure((x, y, width, height, pageX, pageY) => {
        addFloatingReactionSource({
          element,
          position: {
            x: pageX + width / 2 - ELEMENT_WIDTH / 2,
            y: pageY + height / 2 - ELEMENT_HEIGHT / 2,
            width: ELEMENT_WIDTH,
            height: ELEMENT_HEIGHT,
          },
        });
      });
    }
  }, [image, addFloatingReactionSource]);

  const addToCart = useCallback(() => {
    animateCart();
    setCartProduct(product, 1);
  }, [animateCart, product, setCartProduct]);

  return (
    <View style={wrapperStyle}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={handlePressProduct}>
        <Image
          ref={imageRef}
          resizeMode="contain"
          source={{uri: image?.url}}
          style={[styles.image, imageStyle]}
        />
        <View style={styles.infoContainer}>
          <TextView style={styles.name}>{name}</TextView>
          <View style={blockStyle}>
            <View style={styles.priceContainer}>
              <TextView style={priceStyle}>
                {vndCurrencyFormat(sellPrice)}
              </TextView>
              {/* <Tag
                label={pointFormat(point)}
                containerStyle={styles.coinPriceContainer}
              /> */}
            </View>

            <IconButton
              name="cart-plus"
              hitSlop={Layout.hitSlop}
              onPress={addToCart}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 8,

    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,

    elevation: 8,
  },
  container: {
    flex: 1,
  },
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1,
    // textAlign: 'center',
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 10,
    paddingTop: 8,
    borderTopWidth: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  price: {
    marginTop: 2,
    marginRight: 8,
  },

  coinPriceContainer: {
    marginTop: 2,
  },
});
