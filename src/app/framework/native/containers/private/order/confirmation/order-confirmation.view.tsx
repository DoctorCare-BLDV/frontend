import React, {useMemo, useCallback, useState} from 'react';
import {Alert, View} from 'react-native';
// import from library
// import from alias
import {
  FooterActionBar,
  FullScreenLoadingIndicator,
  ProductSectionList,
} from '@native/components';
import {useTheme} from '@app/shared/hooks/useTheme';
import {AddOrderHookOptions, useCart} from '@app/shared/contexts';
import {AddOrderApiRequest, CartSection, ProductData} from '@data/models';
import {HTTPS_SUCCESS_STATUS, vndCurrencyFormat} from '@app/resources';
// localImport
import {OrderConfirmationProps} from './order-confirmation.type';
import {styles} from './order-confirmation.style';
import {CustomerInformation} from './components';

const phoneUtil =
  require('google-libphonenumber').PhoneNumberUtil.getInstance();

const MESSAGES = {
  TOTAL_PRICE_TITLE: 'Tổng thanh toán',
  ORDER: 'Đặt hàng',
  INVALID_DATA: 'Bạn vui lòng điền đẩy đủ thông tin trước khi đặt hàng',
  INVALID_PHONE: 'Số điện thoại không hợp lệ, vui lòng điền lại thông tin',
};

const _OrderConfirmation: React.FC<OrderConfirmationProps> = ({navigation}) => {
  const theme = useTheme();
  const {productList, cartTotalPrice, addOrder, clearCart} = useCart();
  const [isLoading, setLoading] = useState(false);
  const [orderPostParam, setOrderPostParam] = useState({
    name: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    address: '',
  });

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

  const handleFormDataChange = useCallback(data => {
    setOrderPostParam(data);
  }, []);

  const validateData = useCallback(() => {
    const listKeys = Object.keys(
      orderPostParam,
    ) as (keyof typeof orderPostParam)[];
    return listKeys.every(key => {
      if (key === 'phone') {
        let isValidPhone = true;
        try {
          isValidPhone = phoneUtil.isValidNumberForRegion(
            phoneUtil.parse(orderPostParam[key], 'VN'),
            'VN',
          );
        } catch (error) {
          console.log('error_validate_phone', error);
          isValidPhone = false;
        }

        if (!isValidPhone) {
          Alert.alert(MESSAGES.INVALID_PHONE);
        }
        return isValidPhone;
      }
      if (!orderPostParam[key]) {
        Alert.alert(MESSAGES.INVALID_DATA);
      }
      return !!orderPostParam[key];
    });
  }, [orderPostParam]);

  const handleOrder = useCallback(() => {
    if (!validateData()) {
      return;
    }

    const data: AddOrderApiRequest = {
      orderReceived: orderPostParam.name,
      orderPhone: orderPostParam.phone,
      orderProvince: orderPostParam.province,
      orderDistrict: orderPostParam.district,
      orderWard: orderPostParam.ward,
      orderAddress: orderPostParam.address,
      inventoryList: sections.map(section => ({
        inventoryId: section.heading?.id || 0,
        orderProductList: section.data.map(product => ({
          inventoryId: product.inventory?.itemId || 0,
          productId: product.id || 0,
          count: product.quantity || 0,
          profitPrice: product.profitPrice || 0,
          sellPrice: product.sellPrice || 0,
          point: product.point || 0,
        })),
      })),
    };

    const options: AddOrderHookOptions = {
      data,
      onBeforeRequest: () => {
        setLoading(true);
      },
      onRequestSuccess: response => {
        if (response?.status === HTTPS_SUCCESS_STATUS) {
          clearCart();
          navigation.navigate('BottomTab');
        }
      },
      onEndRequest: () => {
        setLoading(false);
      },
    };

    addOrder(options);
  }, [validateData, orderPostParam, sections, addOrder, clearCart, navigation]);

  const listHeaderComponent = useMemo(() => {
    return <CustomerInformation onFormDataChange={handleFormDataChange} />;
  }, [handleFormDataChange]);

  return (
    <View style={containerStyle}>
      <ProductSectionList
        readonly
        sections={sections}
        contentContainerStyle={styles.listContentContainer}
        ListHeaderComponent={listHeaderComponent}
      />
      <FooterActionBar
        safeLayout
        label={MESSAGES.TOTAL_PRICE_TITLE}
        value={vndCurrencyFormat(cartTotalPrice)}
        valueStyle={styles.price}
        btnTitle={MESSAGES.ORDER}
        onBtnPress={handleOrder}
      />
      <FullScreenLoadingIndicator visible={isLoading} useModal={false} />
    </View>
  );
};

export const OrderConfirmation = React.memo(_OrderConfirmation);
