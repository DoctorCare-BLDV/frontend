import React from 'react';
import {View} from 'react-native';
// import alias
import {ListProducts as ListProductsComponent} from '@native/components';

// localImport
import {useListProductsModel} from './list-products.hook';
import {ListProductsProps} from './list-products.type';
import {Header} from './components';

import {styles} from './list-products.style';

const _ListProducts: React.FC<ListProductsProps> = props => {
  const {} = props;
  const {} = useListProductsModel();

  return (
    <View style={[styles.container]}>
      <Header />
      <ListProductsComponent />
    </View>
  );
};

export const ListProducts = React.memo(_ListProducts);
