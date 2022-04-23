import React, {useCallback, useMemo} from 'react';
import {View, StyleSheet, StyleProp, TouchableOpacity} from 'react-native';

import {ImageStyle} from 'react-native-fast-image';

import {Colors} from '@app/resources';
import {useTheme} from '@app/shared/hooks/useTheme';

import {Image} from '../../../image';
import {TextView} from '../../../label';
import {IconButton} from '../../../icon-button';

export type ProductData = {
  id: number;
  name: string;
  image: string;
  coinPrice: string;
  price: string;
};

export interface ProductItemProps extends Omit<ProductData, 'id'> {
  imageStyle?: StyleProp<ImageStyle>;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  name,
  image,
  coinPrice,
  price,
  imageStyle = {},
}) => {
  const theme = useTheme();

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

  const renderCoinPrice = useCallback(() => {
    if (!coinPrice) {
      return null;
    }

    const coinPriceContainerStyle = [
      styles.coinPriceContainer,
      {
        backgroundColor: theme.colorScheme.primary,
      },
    ];

    const coinPriceStyle = [
      styles.coinPrice,
      {
        color: theme.colorScheme.onPrimary,
      },
    ];

    return (
      <View style={coinPriceContainerStyle}>
        <TextView style={coinPriceStyle}>{coinPrice}</TextView>
      </View>
    );
  }, [coinPrice, theme]);

  return (
    <View style={wrapperStyle}>
      <TouchableOpacity activeOpacity={0.8} style={styles.container}>
        <Image
          resizeMode="contain"
          source={{uri: image}}
          style={[styles.image, imageStyle]}
        />
        <View style={styles.infoContainer}>
          <TextView style={styles.name}>{name}</TextView>
          <View style={blockStyle}>
            <View style={styles.priceContainer}>
              <TextView style={priceStyle}>{price}</TextView>
              {renderCoinPrice()}
            </View>

            <IconButton name="cart-plus" />
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
  container: {},
  image: {
    borderRadius: 8,
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
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
    borderTopRightRadius: 0,
  },
  coinPrice: {
    fontSize: 9,
  },
});
