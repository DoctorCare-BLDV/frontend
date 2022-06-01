import React from 'react';
import {Image, View} from 'react-native';
// import from library
import {Divider} from 'react-native-elements';
// import from alias
import {Header, TextView} from '@native/components';
import {Colors, vndCurrencyFormat} from '@app/resources';
import {getUserAvatarForImage} from '@app/utils';
// localImport
import {UsedetailModel} from './detail.hook';
import {detailProps} from './detail.type';
import {styles} from './detail.style';

const Info = [
  {key: 'fullName', value: 'Họ và tên'},
  {key: 'introCode', value: 'Mã giới thiệu'},
  {key: 'phone', value: 'Số điện thoại'},
  {key: 'address', value: 'Địa chỉ'},
  {key: 'totalPrice', value: 'Tổng doanh thu'},
  {key: 'totalBenefit', value: 'Lợi nhuận'},
];

const _detail: React.FC<detailProps> = props => {
  const {} = props;
  const {customerDetail} = UsedetailModel(props);

  return (
    <View style={[styles.container]}>
      <Header leftOnpress={props.navigation.goBack} title={'Thông tin'} />
      <Image
        source={getUserAvatarForImage(customerDetail?.avatar)}
        style={styles.image}
      />
      {Info.map(item => {
        return (
          <>
            <View key={item.key} style={styles.rowInfo}>
              <TextView style={styles.info}>{item.value}</TextView>
              <TextView
                style={styles.info}
                color={
                  item.value === Info[4].value || item.value === Info[5].value
                    ? Colors.PRIMARY_ORAGE
                    : Colors.BLACK
                }>
                {item.value === Info[4].value || item.value === Info[5].value
                  ? vndCurrencyFormat(customerDetail?.[item.key] ?? 0)
                  : customerDetail?.[item.key]}
              </TextView>
            </View>
            <Divider />
          </>
        );
      })}
    </View>
  );
};

export const CustomersDetail = React.memo(_detail);
