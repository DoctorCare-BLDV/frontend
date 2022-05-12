import {Layout} from '@app/resources';
import {useTheme} from '@app/shared/hooks/useTheme';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, SectionList, SectionListProps, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {TextView} from '../../label';
import {ProductSectionData, ProductSectionItem} from './product-section-item';

export interface ProductSectionListProps
  extends SectionListProps<ProductSectionData> {
  readonly?: boolean;
}

export const ProductSectionList = ({
  sections,
  readonly,
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

  const keyExtractor = useCallback((item, index) => {
    return String(item.id || index);
  }, []);

  const renderSectionHeader = useCallback(
    ({section: {title}}) => {
      return (
        <View style={headerContainerStyle}>
          <FontAwesome5Icon name="warehouse" style={headerIconStyle} />
          <TextView style={headerTitleStyle}>{title}</TextView>
        </View>
      );
    },
    [headerTitleStyle, headerIconStyle, headerContainerStyle],
  );

  const renderProduct = useCallback(
    ({item: product}: {item: ProductSectionData}) => {
      return (
        <ProductSectionItem
          name={product.name}
          price={product.price}
          coinPrice={product.coinPrice}
          image={product.image}
          quantity={product.quantity}
          totalPrice={product.totalPrice}
          readonly={product.readonly || readonly}
          containerStyle={productStyle}
        />
      );
    },
    [productStyle, readonly],
  );

  return (
    <SectionList
      sections={sections}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderProduct}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Layout.spacingHorizontal,
    paddingVertical: Layout.spacingVertical,
    borderBottomWidth: 1,
  },
  headerIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  product: {
    borderBottomWidth: 1,
  },
});
