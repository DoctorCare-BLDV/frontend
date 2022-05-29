import React, {useCallback, useMemo} from 'react';
import {
  StyleSheet,
  SectionList,
  SectionListProps,
  View,
  TouchableOpacity,
} from 'react-native';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {Layout} from '@app/resources';
import {useTheme} from '@app/shared/hooks/useTheme';
import {ProductData} from '@data/models';

import {TextView} from '../../label';
import {ProductSectionData, ProductSectionItem} from './product-section-item';

const MESSAGES = {
  DELETE: 'Xoá kho hàng',
};

export interface ProductSectionListProps
  extends SectionListProps<ProductSectionData> {
  readonly?: boolean;
  onProductChangeQuantity?: (quantity: number, product: ProductData) => void;
  onModalHide?: () => void;
  onModalShow?: () => void;
  onDeleteStore?: (inventoryId: number, title?: string) => void;
}

export const ProductSectionList = ({
  sections,
  readonly,
  onProductChangeQuantity = () => {},
  onModalHide,
  onModalShow,
  onDeleteStore,
  ...props
}: ProductSectionListProps) => {
  const theme = useTheme();

  const mainTextStyle = useMemo(() => {
    return {
      color: theme.colorScheme.primary,
    };
  }, [theme]);

  const headerContainerStyle = useMemo(() => {
    return [
      styles.headerContainer,
      {
        backgroundColor: theme.colorScheme.background,
        borderColor: theme.colorScheme.border,
      },
    ];
  }, [theme]);

  const headerIconStyle = useMemo(() => {
    return [styles.headerIcon, mainTextStyle];
  }, [mainTextStyle]);

  const headerTitleStyle = useMemo(() => {
    return [styles.headerTitle, mainTextStyle];
  }, [mainTextStyle]);

  const productStyle = useMemo(() => {
    return [
      styles.product,
      {
        borderColor: theme.colorScheme.border,
      },
    ];
  }, [theme]);

  const listContentContainerStyle = useMemo(() => {
    return [props.contentContainerStyle, styles.listContentContainerStyle];
  }, [props.contentContainerStyle]);

  const keyExtractor = useCallback((item, index) => {
    return String(item.id || index);
  }, []);

  const renderSectionHeader = useCallback(
    ({section}) => {
      const inventoryId = section?.heading?.id;

      return (
        <View style={headerContainerStyle}>
          <View style={styles.headerContentContainer}>
            <FontAwesome5Icon name="warehouse" style={headerIconStyle} />
            <TextView style={headerTitleStyle}>
              {section?.heading?.title}
            </TextView>
          </View>
          {!readonly && !!inventoryId && (
            <TouchableOpacity
              onPress={() =>
                onDeleteStore &&
                onDeleteStore(inventoryId, section?.heading?.title)
              }>
              <TextView>{MESSAGES.DELETE}</TextView>
            </TouchableOpacity>
          )}
        </View>
      );
    },
    [
      headerTitleStyle,
      headerIconStyle,
      headerContainerStyle,
      readonly,
      onDeleteStore,
    ],
  );

  const renderProduct = useCallback(
    ({item: product}: {item: ProductSectionData}) => {
      const totalPrice = (product.sellPrice || 0) * (product.quantity || 0);

      return (
        <ProductSectionItem
          name={product.name}
          sellPrice={product.sellPrice}
          point={product.point}
          image={product.image}
          quantity={product.quantity}
          totalPrice={totalPrice}
          readonly={product.readonly || readonly}
          containerStyle={productStyle}
          onChangeQuantity={quantity =>
            onProductChangeQuantity(quantity, product)
          }
          onModalHide={onModalHide}
          onModalShow={onModalShow}
        />
      );
    },
    [productStyle, readonly, onProductChangeQuantity, onModalHide, onModalShow],
  );

  return (
    <SectionList
      sections={sections}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderProduct}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={listContentContainerStyle}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  listContentContainerStyle: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Layout.spacingHorizontal,
    paddingVertical: Layout.spacingVertical,
    borderTopWidth: 1,
    justifyContent: 'space-between',
  },
  headerContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  product: {
    borderTopWidth: 1,
  },
});
