import React, {useMemo} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

import {useTheme} from '@app/shared/hooks/useTheme';
import {HIT_SLOP, Layout, pointFormat, vndCurrencyFormat} from '@app/resources';
import {ProductData} from '@data/models';

import {TextView} from '../../../label';
import {Tag} from '../../../tag';
import {Image} from '../../../image';
import {NumberPicker} from '../../../number-picker';
import {IconButton, IconButtonType} from '../../../icon-button';

export type ProductSectionData = ProductData & {
  quantity?: number;
  totalPrice?: number;
  readonly?: boolean;
};

export interface ProductSectionItemProps
  extends Omit<ProductSectionData, 'id'> {
  containerStyle?: StyleProp<ViewStyle>;
  onChangeQuantity?: (quantity: number) => void;
  onModalHide?: () => void;
  onModalShow?: () => void;
}

export const ProductSectionItem: React.FC<ProductSectionItemProps> = ({
  name,
  image,
  sellPrice,
  point,
  totalPrice,
  quantity,
  readonly,
  containerStyle,
  onModalHide,
  onModalShow,
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

  const totalPoint = useMemo(() => {
    return (point || 0) * (quantity || 1);
  }, [quantity, point]);

  return (
    <View style={containerBaseStyle}>
      <Image source={{uri: image?.url}} style={styles.image} />

      <View style={styles.mainInfoContainer}>
        <View style={styles.titleContainer}>
          <TextView style={styles.title}>{name}</TextView>
          {!readonly && (
            <IconButton
              type={IconButtonType.CANCEL}
              hitSlop={HIT_SLOP}
              name="times"
              style={styles.closeIcon}
              onPress={() => onChangeQuantity && onChangeQuantity(0)}
            />
          )}
        </View>

        <View style={styles.priceWrapper}>
          <View style={styles.priceContainer}>
            <TextView style={priceStyle}>
              {vndCurrencyFormat(sellPrice)}
            </TextView>
            <Tag
              label={pointFormat(totalPoint)}
              containerStyle={styles.coinPriceContainer}
            />
          </View>

          <View style={styles.quantityWrapper}>
            {readonly ? (
              <View style={styles.readonlyQuantityContainer}>
                <TextView style={readonlyQuantityStyle}>x{quantity}</TextView>
                <TextView style={totalPriceStyle}>
                  {vndCurrencyFormat(totalPrice)}
                </TextView>
              </View>
            ) : (
              <NumberPicker
                value={quantity || 0}
                valueStyle={styles.quantity}
                containerStyle={styles.quantityPickerContainer}
                onChange={onChangeQuantity}
                onModalHide={onModalHide}
                onModalShow={onModalShow}
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
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  closeIcon: {
    fontSize: 16,
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
    fontSize: 15,
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
