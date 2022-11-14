import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {ScrollView, View} from 'react-native';
// import from library
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
// import from alias
import {
  CartFooter,
  Image,
  MediaCarousel,
  NumberPicker,
  Tag,
  TextView,
} from '@native/components';
import {useTheme} from '@app/shared/hooks/useTheme';
import {useCart, useFloatingReaction} from '@app/shared/contexts';
import {AppDimensions, pointFormat, vndCurrencyFormat} from '@app/resources';
// localImport
import {ProductDetailProps} from './product-detail.type';
import {styles} from './product-detail.style';
import {CarNavigationProps} from '../../cart/cart.type';
import {ConfirmationModalNavigationProps} from '../../confirmation-modal/types';

const MESSAGES = {
  PRODUCT_DESC_TITLE: 'Mô tả sản phẩm',
  REMOVE_PRODUCT_CONFIRM_DESCRIPTION:
    'Bạn có chắc muốn xoá sản phẩm này ra khỏi giỏ hàng?',
};

const _ProductDetail: React.FC<ProductDetailProps> = ({route}) => {
  const theme = useTheme();
  const imageRef = useRef();
  const intervalId = useRef<any>(-1);
  const isQuantityModalOpen = useRef(false);
  const {addFloatingReactionSource} = useFloatingReaction();
  const {setCartProduct, getCartProduct} = useCart();
  const cartNavigation = useNavigation<CarNavigationProps>();
  const confirmationModalNavigation =
    useNavigation<ConfirmationModalNavigationProps>();

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  const {id, name, files, point, sellPrice, profitPrice, description} =
    useMemo(() => {
      return route.params.product || {};
    }, [route.params.product]);

  const quantity = getCartProduct(id)?.quantity || 0;

  const totalProfit = (profitPrice || 0) * (quantity || 1);

  const finalPoint = pointFormat((point || 0) * (quantity || 1));

  const {bottom} = useSafeAreaInsets();

  const handleQuantityModalShow = useCallback(() => {
    isQuantityModalOpen.current = true;
  }, []);

  const handleQuantityModalHide = useCallback(() => {
    isQuantityModalOpen.current = false;
  }, []);

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

  const handleChangeQuantity = useCallback(
    (updatedQuantity: number) => {
      if (updatedQuantity > quantity) {
        animateCart();
      }

      if (updatedQuantity <= 0) {
        intervalId.current = setInterval(() => {
          if (!isQuantityModalOpen.current) {
            clearInterval(intervalId.current);
            confirmationModalNavigation.navigate('ConfirmationModal', {
              content: MESSAGES.REMOVE_PRODUCT_CONFIRM_DESCRIPTION,
              onConfirm: () =>
                setCartProduct({
                  ...route.params.product,
                  quantity: updatedQuantity,
                }),
            });
            clearInterval(intervalId.current);
          }
        }, 50);

        return;
      }

      setCartProduct({...route.params.product, quantity: updatedQuantity});
    },
    [
      setCartProduct,
      route.params.product,
      quantity,
      animateCart,
      confirmationModalNavigation,
    ],
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
          <MediaCarousel
            data={files || []}
            sliderWidth={AppDimensions.width}
            itemWidth={AppDimensions.width}
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
                  onModalHide={handleQuantityModalHide}
                  onModalShow={handleQuantityModalShow}
                />
              </View>
            </View>

            {/* <View style={styles.tagPriceContainer}>
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
            </View> */}
          </View>

          <View style={styles.block}>
            <TextView style={styles.blockTitle}>
              {MESSAGES.PRODUCT_DESC_TITLE}
            </TextView>

            <TextView style={styles.blockContentText}>{description}</TextView>
          </View>
        </View>
      </ScrollView>
      <CartFooter onBtnPress={goToCart} />
    </>
  );
};

export const ProductDetail = React.memo(_ProductDetail);
