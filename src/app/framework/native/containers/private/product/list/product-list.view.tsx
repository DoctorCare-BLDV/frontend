import React from 'react';
import {View} from 'react-native';
// import alias
import {ProductList as ProductListComponent} from '@native/components';

// localImport
import {useProductListModel} from './product-list.hook';
import {ProductListProps} from './product-list.type';
import {Header} from './components';

import {styles} from './product-list.style';
import {ProductData} from '@app/framework/native/components/product/list/product-item';

const _ProductList: React.FC<ProductListProps> = props => {
  const {} = props;
  const {} = useProductListModel();

  return (
    <View style={[styles.container]}>
      <Header wrapperStyle={styles.headerWrapper} />
      <ProductListComponent data={DATA} />
    </View>
  );
};

export const ProductList = React.memo(_ProductList);

const DATA: ProductData[] = [
  {
    name: 'Anti-Mage',
    image: 'https://cdn.dota2.com/apps/dota2/images/heroes/antimage_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 1,
  },
  {
    name: 'Axe',
    image: 'https://cdn.dota2.com/apps/dota2/images/heroes/axe_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 2,
  },
  {
    name: 'Bane',
    image: 'https://cdn.dota2.com/apps/dota2/images/heroes/bane_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 3,
  },
  {
    name: 'Bloodseeker',
    image:
      'https://cdn.dota2.com/apps/dota2/images/heroes/bloodseeker_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 4,
  },
  {
    name: 'Crystal Maiden',
    image:
      'https://cdn.dota2.com/apps/dota2/images/heroes/crystal_maiden_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 5,
  },
  {
    name: 'Drow Ranger',
    image:
      'https://cdn.dota2.com/apps/dota2/images/heroes/drow_ranger_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 6,
  },
  {
    name: 'Earthshaker',
    image:
      'https://cdn.dota2.com/apps/dota2/images/heroes/earthshaker_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 7,
  },
  {
    name: 'Juggernaut',
    image: 'https://cdn.dota2.com/apps/dota2/images/heroes/juggernaut_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 8,
  },
  {
    name: 'Mirana',
    image: 'https://cdn.dota2.com/apps/dota2/images/heroes/mirana_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 9,
  },
  {
    name: 'Shadow Fiend',
    image: 'https://cdn.dota2.com/apps/dota2/images/heroes/nevermore_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 11,
  },
  {
    name: 'Morphling',
    image: 'https://cdn.dota2.com/apps/dota2/images/heroes/morphling_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 10,
  },
  {
    name: 'Phantom Lancer',
    image:
      'https://cdn.dota2.com/apps/dota2/images/heroes/phantom_lancer_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 12,
  },
  {
    name: 'Puck',
    image: 'https://cdn.dota2.com/apps/dota2/images/heroes/puck_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 13,
  },
  {
    name: 'Pudge',
    image: 'https://cdn.dota2.com/apps/dota2/images/heroes/pudge_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 14,
  },
  {
    name: 'Razor',
    image: 'https://cdn.dota2.com/apps/dota2/images/heroes/razor_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 15,
  },
  {
    name: 'Sand King',
    image: 'https://cdn.dota2.com/apps/dota2/images/heroes/sand_king_vert.jpg',
    price: '100.000đ',
    coinPrice: '100 MV',
    id: 16,
  },
];
