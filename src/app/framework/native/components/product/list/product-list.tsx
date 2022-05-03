import React, {useCallback, useMemo} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import {AppDimensions, Layout} from '@app/resources';

import {useNavigation} from '@react-navigation/native';
import {FilterModalNavigationProps} from '@app/framework/native/containers/private/filter-modal/types';

import {ListHeader} from './list-header';
import {ProductItem, ProductData} from './product-item';
import {RowItemType} from '../../row-item';

export interface ProductListProps {
  onPressFilter?: () => void;
}

const DATA: ProductData[] = [
  {
    id: 1,
    name: 'Viên Uống Ginkgo Biloba Healthy Care Úc',
    image:
      'https://s3-alpha-sig.figma.com/img/61de/cd62/9c6ee9d606a6b57f222b15bff93aa82a?Expires=1651449600&Signature=A0o24qYbkoj2CSiORO~tFZ2amFEq0ReGhHd~ZJb-yeHUW-uYPsGfGKUnzKZ~uRJW0LWuv96NiVXP6hYZHuQi~C9bkSf-zz~W2Fqn9cGHnGmjR0Y-eHy5esMWmEv-zKNjbtYrMQaY2uYTPb~NNy3jF60C7ex7HoGihCO5moqX-nDqTIw6K-Vlz9P3fIJ64ECOzbOExgdPjICvTwLGSdvL9QnSVROfGFdylUvsyRYGRLMy402SRvmVjDrWUv8RiL4F9IUUNfvXfbp9evCBZSKO7osRAI78VuiCWfsmyeHKTBXIY1tzJyKFKO8riSn~TYogCWOfJXjp4SoLpX2yvI3veg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    price: '10.000.000đ',
    coinPrice: '7 MV',
  },
  {
    id: 2,
    name: 'Viên Uống Ginkgo Biloba Healthy Care Úc',
    image:
      'https://s3-alpha-sig.figma.com/img/f4ff/7bf9/2bf28b416d5413f9f5a86a8b24c7b1cb?Expires=1651449600&Signature=BPpGXvB0SLUr2CCtNZWYHbnXVzmOt8Oy4VDd04lkfGmYOYF8VY2pB5gTpFALYb61op3UpCYT4hGK53clDynUhVVVlL7GdUlJ8cS-WGN4kj3u6iGleFfDbrvqg-qeYjSU~XXVUA3zp6exuxEr753ZbGCND6exQH~1UZTEzypK-Srt3UgJaZmSty5hGjAINbsQ4XkCUH9uW9F1aVbQFmCehvrEGibJgCZkX3L4QKB3JV5NU3s7YnRQWTtyhp0ons5BIIyT6GqSr4EsAyort7~A7dDHK9-AJ~BkCHb1~EMjnIpmdQ2CCk3Oc9lx4xqTcPnLoIM2OM7cBuA2~KFiqSxWQg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    price: '100.000đ',
    coinPrice: '7 MV',
  },
  {
    id: 3,
    name: 'Viên Uống Ginkgo Biloba Healthy Care Úc',
    image:
      'https://s3-alpha-sig.figma.com/img/d8fc/8e23/c89c6e8f17afe38d20ac39a308a24b4d?Expires=1651449600&Signature=TRCRIJhSJLlxdp6cLm9XITTeXWXErlREsCU09tkoIqdEkaeaeivjeqkBtSB-t6fc20pQRb9gALs0E2bcpx784yX4I9D6qTA5QsgdY-~XvSBufm17okhUeADfxXVtWx8fJS372uzo4s1NWR3Gc5gpoo53RptBN~sxyoXwmAutHDKkm-WPsUcD1Em5fAjB6ojbiNdnj4NTyNhwEXeI4bMfNSMhgUXHygrJIOODe4fLtCCp5csAEYBdTLD~5qaTqajApa0OWoD~i2g2NLztoyVCxyfPNRTJe4ZTBNchLXHqMD9d8xUbSJsRzuxvag8GJatxYK7i9iRPpfVZQkAOUmbRdQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    price: '100.000đ',
    coinPrice: '7 MV',
  },
  {
    id: 4,
    name: 'Viên Uống Ginkgo Biloba Healthy Care Úc',
    image:
      'https://s3-alpha-sig.figma.com/img/a595/0aa1/f62ea4d983621a498c9170555518c9d2?Expires=1651449600&Signature=LD0oiDoiMhu3FLt7gmsY-HoIzuW7xaLx2c~5zGLvKB2~z8mdQwzraFu6Gq~LmmlllBo6X2D1zbOoL-pK5n4bwPLjk1T6Tb1U2G6jFNOjbHio6b4pI3CO0Xy9EnS8KpFyXFAAIi1E3XN0zfsPhd85FTNXrMRVH~yuENu39GRQrEBUKb82064kh-eQTy7U6PqvKeOSCd-4yecfTRxnP2pszUgsUPPhS0IkUXGxCQSP6t-i4fDDeO0cQ7Rv-8ORW7gVhXhase1GbMfJPp7BX41n0Z59CLoaApfZ3Y4MrgavRYVMzswbmKwE8~QPlRctw95DMhNfjfjU8aVf7UZuW6Nq0A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    price: '100.000đ',
    coinPrice: '7 MV',
  },
  {
    id: 5,
    name: 'Viên Uống Ginkgo Biloba Healthy Care Úc',
    image:
      'https://s3-alpha-sig.figma.com/img/ab42/815c/586fb790f3df609764e3bf106314423a?Expires=1651449600&Signature=DlllQ3lm6OleVMhngnhbWN~wJcVGsRxpWq6pl2UWEZWl1PF5DPInv6X8LPI3KhUweH4axxF6PGQYTs-TNFBTZKC6t3ljPmWd~LoxUoX37dSX460dqQ71dciMp-bzym-C~k~o1wH6EpO6wo0FF3HXoOjnCK-MJqiWxN3BERmxu4VV1x53Ct7A7nOHJtk-RYo9tBU6Y4A9ay-UKOFMPQRveDwRMhFnIrSTDDKkHTy2p~3HckD~3s8PrA8ADPS-dOHVQ~4tn2Unj7idzEJTH~RUBAKG~V-jNY1m4aOXY0C8TqSHVkr~VV1387YkPOy7FtwaeiEstx4yMqNH0eO-Ohi8xw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    price: '100.000đ',
    coinPrice: '7 MV',
  },
];

export const ProductList: React.FC<ProductListProps> = ({onPressFilter}) => {
  const filterModalNavigation = useNavigation<FilterModalNavigationProps>();

  const handlePressFilter = useCallback(() => {
    if (onPressFilter) {
      onPressFilter();
      return;
    }

    filterModalNavigation.navigate('FilterModal', {
      selectedData: [
        {id: 3, label: 'Thuốc bổ gan', type: RowItemType.CHECK_BOX},
        {id: 6, label: 'Kho Hà Đông', type: RowItemType.CHECK_BOX},
      ],
      data: [
        {
          title: 'Danh mục',
          data: [
            {id: 1, label: 'Thuốc bổ não', type: RowItemType.CHECK_BOX},
            {id: 2, label: 'Thuốc bổ tim', type: RowItemType.CHECK_BOX},
            {id: 3, label: 'Thuốc bổ gan', type: RowItemType.CHECK_BOX},
          ],
        },
        {
          title: 'Kho',
          data: [
            {id: 4, label: 'Kho Thanh Xuân', type: RowItemType.CHECK_BOX},
            {id: 5, label: 'Kho Long Biên', type: RowItemType.CHECK_BOX},
            {id: 6, label: 'Kho Hà Đông', type: RowItemType.CHECK_BOX},
          ],
        },
      ],
      onFinishSelectOptions: e => console.log(e),
    });
  }, [onPressFilter, filterModalNavigation]);

  const listHeaderComponent = useMemo(() => {
    return <ListHeader onPressFilter={handlePressFilter} />;
  }, [handlePressFilter]);

  const renderProduct = ({
    item: product,
    index,
  }: {
    item: ProductData;
    index: number;
  }) => {
    return (
      <View
        style={[
          styles.productContainer,
          {
            [index % 2 === 0 ? 'paddingRight' : 'paddingLeft']:
              Layout.spacingHorizontal / 2,
          },
        ]}>
        <ProductItem
          name={product.name}
          price={product.price}
          coinPrice={product.coinPrice}
          image={product.image}
          imageStyle={styles.productImage}
        />
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={styles.listContentContainer}
      data={DATA}
      renderItem={renderProduct}
      numColumns={2}
      keyExtractor={(item, index) => String(item?.id || index)}
      ListHeaderComponent={listHeaderComponent}
    />
  );
};

const IMAGE_DIMENSIONS =
  AppDimensions.width / 2 -
  Layout.spacingHorizontal -
  Layout.spacingHorizontal / 2;

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContentContainer: {
    paddingBottom: Layout.spacingHorizontal,
  },
  productContainer: {
    width: AppDimensions.width / 2,
    padding: Layout.spacingHorizontal,
    paddingBottom: 0,
  },
  productImage: {
    width: IMAGE_DIMENSIONS,
    height: IMAGE_DIMENSIONS,
  },
});
