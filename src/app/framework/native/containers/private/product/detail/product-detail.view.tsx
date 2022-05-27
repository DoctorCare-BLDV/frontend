import React, {useCallback, useMemo, useRef} from 'react';
import {ScrollView, View} from 'react-native';
// import from library
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import from alias
import {
  CartFooter,
  Image,
  NumberPicker,
  Tag,
  TextView,
} from '@native/components';
import {useTheme} from '@app/shared/hooks/useTheme';
import {useCart, useFloatingReaction} from '@app/shared/contexts';
import {pointFormat, vndCurrencyFormat} from '@app/resources';
import {useNavigation} from '@react-navigation/native';
// localImport
import {ProductDetailProps} from './product-detail.type';
import {styles} from './product-detail.style';
import {CarNavigationProps} from '../../cart/cart.type';

const MESSAGES = {
  TITLE:
    'Viên Uống Hỗ Trợ Cải Thiện Giấc Ngủ Hush & Hush Mind Your Mind, 30 viên',
  PRICE: '100.000đ',
  MV: '48MV',
  PRICE_2: '480.000đ',
  PRODUCT_DESC_TITLE: 'Mô tả sản phẩm',
  PRODUCT_DESC: `Thuốc bổ não giúp hỗ trợ điều trị chóng mặt, đau đầu và các bệnh về thần kinh, não. Ngoài ra, thuốc giúp tăng cường trí nhớ và sự minh mẫn của não bộ. Không những vậy, thuốc có thể làm giảm độ nhớt máu, điều hòa mạch máu, giảm ngưng kết...
  Thuốc bổ não giúp hỗ trợ điều trị chóng mặt, đau đầu và các bệnh về thần kinh, não. Ngoài ra, thuốc giúp tăng cường trí nhớ và sự minh mẫn của não bộ. Không những vậy, thuốc có thể làm giảm độ nhớt máu, điều hòa mạch máu, giảm ngưng kết...
  `,
};

const _ProductDetail: React.FC<ProductDetailProps> = ({route}) => {
  const theme = useTheme();
  const imageRef = useRef();
  const {addFloatingReactionSource} = useFloatingReaction();
  const {setCartProduct, getCartProduct} = useCart();
  const cartNavigation = useNavigation<CarNavigationProps>();

  const {id, name, files, point, sellPrice, profitPrice, description} =
    useMemo(() => {
      return route.params.product || {};
    }, [route.params.product]);

  const quantity = getCartProduct(id)?.quantity || 0;

  const totalProfit = (profitPrice || 0) * (quantity || 1);

  const finalPoint = pointFormat((point || 0) * (quantity || 1));

  const {bottom} = useSafeAreaInsets();

  const animateCart = useCallback(() => {
    if (imageRef.current) {
      const ELEMENT_WIDTH = 100;
      const ELEMENT_HEIGHT = 100;
      const elementStyle = {width: ELEMENT_WIDTH, height: ELEMENT_HEIGHT};
      const element = (
        <Image
          source={{
            uri: files?.[0]?.url,
          }}
          style={elementStyle}
        />
      );

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
  }, [addFloatingReactionSource, files]);

  const addToCart = useCallback(() => {
    animateCart();
    setCartProduct(route.params.product, 1);
  }, [animateCart, setCartProduct, route.params.product]);

  const handleChangeQuantity = useCallback(
    (updatedQuantity: number) => {
      if (updatedQuantity > quantity) {
        animateCart();
      }
      setCartProduct({...route.params.product, quantity: updatedQuantity});
    },
    [setCartProduct, route.params.product, quantity, animateCart],
  );

  const goToCart = useCallback(() => {
    cartNavigation.navigate('Cart');
  }, [cartNavigation]);

  const containerStyle = useMemo(() => {
    return [
      styles.container,
      {
        backgroundColor: theme.colorScheme.surface,
      },
    ];
  }, [theme]);

  const contentContainerStyle = useMemo(() => {
    return [
      styles.contentContainer,
      {
        // paddingBottom: bottom,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottom]);

  const priceStyle = useMemo(() => {
    return [
      styles.price,
      {
        color: theme.colorScheme.primary,
      },
    ];
  }, [theme]);

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={containerStyle}
        contentContainerStyle={contentContainerStyle}>
        <View style={styles.imageContainer}>
          <Image
            ref={imageRef}
            source={{
              uri: files?.[0]?.url,
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.overview}>
          <TextView style={styles.title}>{name}</TextView>

          <View style={styles.priceWrapper}>
            <View style={styles.priceContainer}>
              <TextView style={priceStyle}>
                {vndCurrencyFormat(sellPrice)}
              </TextView>

              <View style={styles.quantityContainer}>
                <NumberPicker
                  value={quantity}
                  onChange={handleChangeQuantity}
                />
              </View>
            </View>

            <View style={styles.tagPriceContainer}>
              <Tag
                label={finalPoint}
                containerStyle={styles.tagContainer}
                labelStyle={styles.tagLabel}
              />
              <Tag
                label={totalProfit ? vndCurrencyFormat(totalProfit) : ''}
                containerStyle={styles.tagContainer}
                labelStyle={styles.tagLabel}
              />
            </View>
          </View>

          <View style={styles.block}>
            <TextView style={styles.blockTitle}>
              {MESSAGES.PRODUCT_DESC_TITLE}
            </TextView>

            <TextView style={styles.blockContentText}>{description}</TextView>
          </View>
        </View>
      </ScrollView>
      <CartFooter onLabelPress={addToCart} onBtnPress={goToCart} />
    </>
  );
};

export const ProductDetail = React.memo(_ProductDetail);
