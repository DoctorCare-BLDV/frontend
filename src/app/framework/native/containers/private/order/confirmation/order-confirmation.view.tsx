import React, {useMemo} from 'react';
import {Alert, View} from 'react-native';
// import from library
// import from alias
import {FooterActionBar, ProductSectionList} from '@native/components';
import {useTheme} from '@app/shared/hooks/useTheme';
import {useCart} from '@app/shared/contexts';
// localImport
import {OrderConfirmationProps} from './order-confirmation.type';
import {styles} from './order-confirmation.style';
import {CustomerInformation} from './components';
import {CartSection, ProductData} from '@data/models';
import {vndCurrencyFormat} from '@app/resources';
import {useCallback} from 'react';
import {useState} from 'react';

const MESSAGES = {
  TOTAL_PRICE_TITLE: 'Tổng thanh toán',
  ORDER: 'Đặt hàng',
  INVALID_DATA: 'Bạn vui lòng điền đẩy đủ thông tin trước khi đặt hàng',
};

const _OrderConfirmation: React.FC<OrderConfirmationProps> = () => {
  const theme = useTheme();
  const {productList} = useCart();
  const [orderPostParam, setOrderPostParam] = useState({
    name: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    address: '',
  });

  const totalPrice = useMemo(() => {
    return (
      productList?.reduce((prev, current) => {
        return Number(prev || 0) + Number(current.sellPrice || 0);
      }, 0) || 0
    );
  }, [productList]);

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

  const validateData = useMemo(() => {
    return Object.values(orderPostParam).every(value => !!value);
  }, [orderPostParam]);

  const handleOrder = useCallback(() => {
    if (!validateData) {
      return Alert.alert(MESSAGES.INVALID_DATA);
    }
  }, [validateData]);

  const listHeaderComponent = useMemo(() => {
    return <CustomerInformation onFormDataChange={handleFormDataChange} />;
  }, [handleFormDataChange]);

  return (
    <View style={containerStyle}>
      <ProductSectionList
        readonly
        sections={sections}
        ListHeaderComponent={listHeaderComponent}
      />
      <FooterActionBar
        safeLayout
        label={MESSAGES.TOTAL_PRICE_TITLE}
        value={vndCurrencyFormat(totalPrice)}
        valueStyle={styles.price}
        btnTitle={MESSAGES.ORDER}
        onBtnPress={handleOrder}
      />
    </View>
  );
};

export const OrderConfirmation = React.memo(_OrderConfirmation);
