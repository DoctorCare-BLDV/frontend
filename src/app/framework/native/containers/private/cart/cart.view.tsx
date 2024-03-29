import React, {useCallback, useEffect, useMemo} from 'react';
import {View} from 'react-native';
// import from library
import {useNavigation} from '@react-navigation/native';
// import from alias
import {CartFooter, ProductSectionList, TextView} from '@native/components';
import {useTheme} from '@app/shared/hooks/useTheme';
// localImport
import {CartProps} from './cart.type';
import {styles} from './cart.style';
import {ConfirmationModalNavigationProps} from '../confirmation-modal/types';
import {useCart} from '@app/shared/contexts';
import {CartSection, ProductData} from '@data/models';
import {vndCurrencyFormat} from '@app/resources';
import {useRef} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const MESSAGES = {
  DELETE_ALL: 'Xoá tất cả',
  DELETE_ALL_CONFIRM_TITLE: 'Xoá tất cả sản phẩm',
  DELETE_ALL_CONFIRM_DESCRIPTION:
    'Bạn có chắc chắn muốn xoá tất cả sản phẩm đang có trong giỏ hàng?',
  CONFIRM: 'Xác nhận',
  PRICE: '100.000.000đ',
  TOTAL_PROFIT: 'Tổng lợi nhuận',
  TOTAL_PROFIT_VALUE: '400.000đ',
  REMOVE_PRODUCT_CONFIRM_DESCRIPTION:
    'Bạn có chắc muốn xoá sản phẩm này ra khỏi giỏ hàng?',
  CART_EMPTY: 'Chưa có sản phẩm nào!',
  DELETE_STORE_CONFIRM_DESCRIPTION:
    'Bạn có chắc muốn xoá toàn bộ sản phẩm trong giỏ hàng thuộc ',
};

const _Cart: React.FC<CartProps> = ({navigation}) => {
  const isQuantityModalOpen = useRef(false);
  const intervalCheckQuantityModalOpenId = useRef<any>(-1);
  const intervalCheckRemoveConfirmationModalOpenId = useRef<any>(-1);
  const hasAction = useRef(false);

  const {
    productList,
    setCartProduct,
    removeAllProductFromInventory,
    clearCart,
    cartTotalPrice,
  } = useCart();
  const theme = useTheme();
  const confirmationModalNavigation =
    useNavigation<ConfirmationModalNavigationProps>();
  const orderConfirmationNavigation = useNavigation<any>();

  useEffect(() => {
    return () => {
      hasAction.current = false;
      clearInterval(intervalCheckRemoveConfirmationModalOpenId.current);
      clearInterval(intervalCheckQuantityModalOpenId.current);
    };
  }, []);

  useEffect(() => {
    if (!productList.length && hasAction.current) {
      clearInterval(intervalCheckRemoveConfirmationModalOpenId.current);
      intervalCheckRemoveConfirmationModalOpenId.current = setInterval(() => {
        if (!isQuantityModalOpen.current) {
          clearInterval(intervalCheckRemoveConfirmationModalOpenId.current);
          navigation.goBack();
        }
      }, 50);
    }

    return () => {
      clearInterval(intervalCheckRemoveConfirmationModalOpenId.current);
    };
  }, [productList, navigation]);

  const sections: CartSection = useMemo(() => {
    const cartSections: CartSection = [];

    (productList || []).forEach((product: ProductData) => {
      if (!product.inventory) {
        return;
      }
      const tempProduct = {...product};
      const inventoryTitle = tempProduct?.inventory?.itemName;
      const sectionIndex = cartSections.findIndex(
        section => section?.heading?.title === inventoryTitle,
      );

      if (sectionIndex === -1) {
        cartSections.push({
          heading: {title: inventoryTitle, id: tempProduct?.inventory?.itemId},
          data: [tempProduct],
        });
      } else {
        cartSections[sectionIndex].data.push(tempProduct);
      }
    });

    return cartSections;
  }, [productList]);

  const containerStyle = useMemo(() => {
    return [
      styles.container,
      {
        backgroundColor: theme.colorScheme.surface,
      },
    ];
  }, [theme]);

  const emptyIconStyle = useMemo(() => {
    return [
      styles.emptyIcon,
      {
        color: theme.colorScheme.inactive,
      },
    ];
  }, [theme]);

  const emptyTitleStyle = useMemo(() => {
    return [
      styles.emptyTitle,
      {
        color: theme.colorScheme.inactive,
      },
    ];
  }, [theme]);

  const handleQuantityModalShow = useCallback(() => {
    isQuantityModalOpen.current = true;
  }, []);

  const handleQuantityModalHide = useCallback(() => {
    isQuantityModalOpen.current = false;
  }, []);

  const updateCartProduct = useCallback(
    (product, quantity) => {
      hasAction.current = true;
      setCartProduct({
        ...product,
        quantity,
      });
    },
    [setCartProduct],
  );

  const handleProductChangeQuantity = useCallback(
    (quantity, product) => {
      if (quantity <= 0) {
        clearInterval(intervalCheckQuantityModalOpenId.current);
        intervalCheckQuantityModalOpenId.current = setInterval(() => {
          if (!isQuantityModalOpen.current) {
            confirmationModalNavigation.navigate('ConfirmationModal', {
              content: MESSAGES.REMOVE_PRODUCT_CONFIRM_DESCRIPTION,
              onConfirm: () => updateCartProduct(product, quantity),
            });
            clearInterval(intervalCheckQuantityModalOpenId.current);
          }
        }, 50);

        return;
      }

      updateCartProduct(product, quantity);
    },
    [confirmationModalNavigation, updateCartProduct],
  );

  const handleDeleteStore = useCallback(
    (inventoryId, title) => {
      confirmationModalNavigation.navigate('ConfirmationModal', {
        content: MESSAGES.DELETE_STORE_CONFIRM_DESCRIPTION + title + '?',
        onConfirm: () => removeAllProductFromInventory(inventoryId),
      });
    },
    [removeAllProductFromInventory, confirmationModalNavigation],
  );

  const handlePressDeleteAll = useCallback(() => {
    confirmationModalNavigation.navigate('ConfirmationModal', {
      content: MESSAGES.DELETE_ALL_CONFIRM_DESCRIPTION,
      onConfirm: clearCart,
    });
  }, [confirmationModalNavigation, clearCart]);

  const goToOrderConfirmation = useCallback(() => {
    orderConfirmationNavigation.navigate('OrderConfirmation');
  }, [orderConfirmationNavigation]);

  const ListEmpty = useMemo(() => {
    return (
      <View style={styles.emptyContainer}>
        <FontAwesome5Icon name="shopping-bag" style={emptyIconStyle} />
        <TextView style={emptyTitleStyle}>{MESSAGES.CART_EMPTY}</TextView>
      </View>
    );
  }, [emptyIconStyle, emptyTitleStyle]);

  return (
    <View style={containerStyle}>
      {/* <View style={totalProfitContainerStyle}>
        <TextView style={totalProfitTextStyle}>
          {MESSAGES.TOTAL_PROFIT}
        </TextView>
        <TextView style={totalProfitTextStyle}>
          {vndCurrencyFormat(totalProfit)}
        </TextView>
      </View> */}
      <ProductSectionList
        sections={sections}
        onProductChangeQuantity={handleProductChangeQuantity}
        onDeleteStore={handleDeleteStore}
        onModalHide={handleQuantityModalHide}
        onModalShow={handleQuantityModalShow}
        ListEmptyComponent={ListEmpty}
      />
      {!!productList?.length && (
        <CartFooter
          label={MESSAGES.DELETE_ALL}
          value={vndCurrencyFormat(cartTotalPrice)}
          iconLeftName="trash-alt"
          btnTitle={MESSAGES.CONFIRM}
          safeLayout
          onLabelPress={handlePressDeleteAll}
          onBtnPress={goToOrderConfirmation}
        />
      )}
    </View>
  );
};

export const Cart = React.memo(_Cart);
