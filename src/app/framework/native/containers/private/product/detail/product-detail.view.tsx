import React, {useMemo, useState} from 'react';
import {ScrollView, View} from 'react-native';
// import from library
// import from alias
import {
  CartFooter,
  Image,
  NumberPicker,
  Tag,
  TextView,
} from '@native/components';
// localImport
import {ProductDetailProps} from './product-detail.type';
import {styles} from './product-detail.style';
import {useTheme} from '@app/shared/hooks/useTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const MESSAGES = {
  TITLE:
    'Viên Uống Hỗ Trợ Cải Thiện Giấc Ngủ Hush & Hush Mind Your Mind, 30 viên',
  PRICE: '100.000đ',
  MV: '48MV',
  PRICE_2: '480.000đ',
  PRODUCT_DESC_TITLE: 'Mô tả sản phẩm',
  PRODUCT_DESC: `Thuốc bổ não giúp hỗ trợ điều trị chóng mặt, đau đầu và các bệnh về thần kinh, não. Ngoài ra, thuốc giúp tăng cường trí nhớ và sự minh mẫn của não bộ. Không những vậy, thuốc có thể làm giảm độ nhớt máu, điều hòa mạch máu, giảm ngưng kết...
  Thuốc bổ não giúp hỗ trợ điều trị chóng mặt, đau đầu và các bệnh về thần kinh, não. Ngoài ra, thuốc giúp tăng cường trí nhớ và sự minh mẫn của não bộ. Không những vậy, thuốc có thể làm giảm độ nhớt máu, điều hòa mạch máu, giảm ngưng kết...
  `,
};

const _ProductDetail: React.FC<ProductDetailProps> = ({}) => {
  const theme = useTheme();

  const {bottom} = useSafeAreaInsets();

  const [quantity, setQuantity] = useState(0);

  const containerStyle = useMemo(() => {
    return [
      styles.container,
      {
        backgroundColor: theme.colorScheme.surface,
      },
    ];
  }, [theme]);

  const contentContainerStyle = useMemo(() => {
    return [
      styles.contentContainer,
      {
        // paddingBottom: bottom,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottom]);

  const priceStyle = useMemo(() => {
    return [
      styles.price,
      {
        color: theme.colorScheme.primary,
      },
    ];
  }, [theme]);

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={containerStyle}
        contentContainerStyle={contentContainerStyle}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/61de/cd62/9c6ee9d606a6b57f222b15bff93aa82a?Expires=1652659200&Signature=GDhlO460K~DnILd2V-WyOqnrZVPf60hBVK2I-nlBqu~6iS~dAIy-qo3s15DsZugehaw7uqcP23~SQsJS4rYnoEqw50q~xDiAWqFxJbefQWXwJMMwOrGXVpQ5crLLwaJljgCZAvh5wY9mpbhbzxQbPVUR-8vs~r5HUW18WrqpAWNiwSGuRh-oYToAVRVeNQJhtG-yh~Sc~NGEWXqaMHsBukGunXxnXhp32-FraMDLRj1BEDgMsnnGc3ZbQ5~Ki-fQ1q3Mu6jpFvQgUH6-ZaHyYk2ogtI9dSND1s48-Th2a4k~8VBfVYIb6QGwMJL51aMceeEmvHLiW8CHC73IZ28O5w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.overview}>
          <TextView style={styles.title}>{MESSAGES.TITLE}</TextView>

          <View style={styles.priceWrapper}>
            <View style={styles.priceContainer}>
              <TextView style={priceStyle}>{MESSAGES.PRICE}</TextView>

              <View style={styles.quantityContainer}>
                <NumberPicker value={quantity} onChange={setQuantity} />
              </View>
            </View>

            <View style={styles.tagPriceContainer}>
              <Tag
                label={MESSAGES.MV}
                containerStyle={styles.tagContainer}
                labelStyle={styles.tagLabel}
              />
              <Tag
                label={MESSAGES.PRICE_2}
                containerStyle={styles.tagContainer}
                labelStyle={styles.tagLabel}
              />
            </View>
          </View>

          <View style={styles.block}>
            <TextView style={styles.blockTitle}>
              {MESSAGES.PRODUCT_DESC_TITLE}
            </TextView>

            <TextView style={styles.blockContentText}>
              {MESSAGES.PRODUCT_DESC}
            </TextView>
          </View>
        </View>
      </ScrollView>
      <CartFooter />
    </>
  );
};

export const ProductDetail = React.memo(_ProductDetail);
