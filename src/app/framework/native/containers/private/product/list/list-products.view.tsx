import React from 'react';
import {} from 'react-native';
// import from library
import {SafeAreaView} from 'react-native-safe-area-context';
// import from alias
import {Text} from '@native/components';
// localImport
import {useListProductsModel} from './list-products.hook';
import {ListProductsProps} from './list-products.type';
import {styles} from './list-products.style';

const _ListProducts: React.FC<ListProductsProps> = props => {
  const {} = props;
  const {} = useListProductsModel();

  return (
    <SafeAreaView style={[styles.container]}>
      <Text />
    </SafeAreaView>
  );
};

export const ListProducts = React.memo(_ListProducts);
