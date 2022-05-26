import React, {useMemo} from 'react';
import {View} from 'react-native';
// import from library
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import from alias
import {ProductSectionList} from '@native/components';
import {useTheme} from '@app/shared/hooks/useTheme';
import {useCart} from '@app/shared/contexts';
// localImport
import {OrderConfirmationProps} from './order-confirmation.type';
import {styles} from './order-confirmation.style';
import {CustomerInformation} from './components';
import {CartSection, ProductData} from '@data/models';

const _OrderConfirmation: React.FC<OrderConfirmationProps> = () => {
  const theme = useTheme();
  const {productList} = useCart();

  const {bottom} = useSafeAreaInsets();

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

  const listContentContainerStyle = useMemo(() => {
    return {
      paddingBottom: bottom,
    };
  }, [bottom]);

  const listHeaderComponent = useMemo(() => {
    return <CustomerInformation />;
  }, []);

  return (
    <View style={containerStyle}>
      <ProductSectionList
        readonly
        contentContainerStyle={listContentContainerStyle}
        sections={sections}
        ListHeaderComponent={listHeaderComponent}
      />
    </View>
  );
};

export const OrderConfirmation = React.memo(_OrderConfirmation);
