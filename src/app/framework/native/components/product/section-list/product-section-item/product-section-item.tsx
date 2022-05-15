import React, {useMemo} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

import {useTheme} from '@app/shared/hooks/useTheme';
import {Layout} from '@app/resources';

import {TextView} from '../../../label';
import {Tag} from '../../../tag';
import {ProductData} from '../../list/product-item';
import {Image} from '../../../image';
import {NumberPicker} from '../../../number-picker';

export type ProductSectionData = ProductData & {
  quantity?: number;
  totalPrice?: string;
  readonly?: boolean;
};

export interface ProductSectionItemProps
  extends Omit<ProductSectionData, 'id'> {
  containerStyle?: StyleProp<ViewStyle>;
  onChangeQuantity?: (quantity: number) => void;
}

export const ProductSectionItem: React.FC<ProductSectionItemProps> = ({
  name,
  image,
  price,
  coinPrice,
  totalPrice,
  quantity,
  readonly,
  containerStyle,
  onChangeQuantity,
}) => {
  const theme = useTheme();

  const containerBaseStyle = useMemo(() => {
    return [styles.container, containerStyle];
  }, [containerStyle]);

  const priceStyle = useMemo(() => {
    return [
      styles.price,
      {
        color: theme.colorScheme.primary,
      },
    ];
  }, [theme]);

  const readonlyQuantityStyle = useMemo(() => {
    return [
      styles.readonlyQuantity,
      {
        color: theme.textColorScheme.secondary,
      },
    ];
  }, [theme]);

  const totalPriceStyle = useMemo(() => {
    return [
      styles.totalPrice,
      {
        color: theme.colorScheme.primary,
      },
    ];
  }, [theme]);

  return (
    <View style={containerBaseStyle}>
      <Image source={{uri: image}} style={styles.image} />

      <View style={styles.mainInfoContainer}>
        <TextView style={styles.title}>{name}</TextView>

        <View style={styles.priceWrapper}>
          <View style={styles.priceContainer}>
            <TextView style={priceStyle}>{price}</TextView>
            <Tag label={coinPrice} containerStyle={styles.coinPriceContainer} />
          </View>

          <View style={styles.quantityWrapper}>
            {readonly ? (
              <View style={styles.readonlyQuantityContainer}>
                <TextView style={readonlyQuantityStyle}>x{quantity}</TextView>
                <TextView style={totalPriceStyle}>{totalPrice}</TextView>
              </View>
            ) : (
              <NumberPicker
                value={quantity || 0}
                valueStyle={styles.quantity}
                containerStyle={styles.quantityPickerContainer}
                onChange={onChangeQuantity}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Layout.spacingHorizontal,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  mainInfoContainer: {
    flex: 1,
  },
  title: {
    // flex: 1,
  },
  priceWrapper: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    minWidth: 100,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },

  coinPriceContainer: {
    marginTop: 2,
  },

  quantityWrapper: {
    flex: 0.2,
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    minWidth: 100,
  },

  quantity: {
    minWidth: 20,
  },
  readonlyQuantityContainer: {
    alignItems: 'flex-end',
    width: '100%',
  },
  readonlyQuantity: {},
  totalPrice: {
    fontSize: 16,
    fontWeight: '600',
  },

  quantityPickerContainer: {
    width: '100%',
    justifyContent: 'flex-end',
  },
});
