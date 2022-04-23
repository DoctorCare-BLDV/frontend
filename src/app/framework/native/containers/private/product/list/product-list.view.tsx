import React from 'react';
import {View} from 'react-native';
// import alias
import {ProductList as ProductListComponent} from '@native/components';

// localImport
import {useProductListModel} from './product-list.hook';
import {ProductListProps} from './product-list.type';
import {Header} from './components';

import {styles} from './product-list.style';

const _ProductList: React.FC<ProductListProps> = props => {
  const {} = props;
  const {} = useProductListModel();

  return (
    <View style={[styles.container]}>
      <Header wrapperStyle={styles.headerWrapper} />
      <ProductListComponent />
    </View>
  );
};

export const ProductList = React.memo(_ProductList);
