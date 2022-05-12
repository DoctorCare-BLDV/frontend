import React from 'react';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
// import from library
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {Icon} from '@fortawesome/fontawesome-svg-core';
// import from alias
import {useUser} from '@app/shared/contexts';
import {IconLabel, KeyValueLabel, TextView} from '@native/components';
import {callPhone, copyText} from '@app/utils';
import {Colors} from '@app/resources';
// localImport
import {useProfileModel} from './profile.hook';
import {ProfileProps} from './profile.type';
import {styles} from './profile.style';
import {Header} from './components';

const _INFO = [
  {key: 'Số điện thoại', value: 'userName', hasAction: false},
  {key: 'Mã giới thiệu', value: 'myIntroCode', hasAction: true},
  {key: 'Địa chỉ', value: 'address', hasAction: false},
  {key: 'Thông tin ngân hàng', value: 'bank', hasAction: false},
];

const _Profile: React.FC<ProfileProps> = props => {
  const {} = props;
  const {onConfirmLogout, fetchUser} = useProfileModel();
  const {user} = useUser();
  return (
    <>
      <View style={[styles.container]}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={fetchUser} />
          }
          showsVerticalScrollIndicator={false}>
          <Header />
          <TouchableOpacity
            onPress={() => null} //navigation.navigate('EditProfile')}
            style={styles.editBtn}>
            <FontAwesomeIcon
              color={Colors.PRIMARY_ORAGE}
              size={20}
              icon={faPenToSquare as Icon}
            />
          </TouchableOpacity>
          {_INFO.map((v, i) => (
            <KeyValueLabel
              key={i}
              onPress={
                v.hasAction
                  ? () => copyText((user as any)?.[v.value])
                  : undefined
              }
              containerStyle={styles.infoRow}
              keyLabel={v.key + ':'}
              valueLabel={
                (user as any)?.[v.value] || 'Chưa có ' + v.key.toLowerCase()
              }
              keyStyle={styles.infoKey}
              valueStyle={styles.infoValue}
              divider={1}
            />
          ))}
          <IconLabel
            containerStyle={styles.copyrightWrapper}
            labelStyle={styles.copyright}
            text="Bản quyền:"
            suffix={<TextView style={styles.logo}>{'Doctor Care'}</TextView>}
          />
          <KeyValueLabel
            containerStyle={styles.infoRow}
            keyLabel="Đường dây nóng: "
            onPress={() => callPhone('0343692432')}
            valueLabel="0343692432"
            keyStyle={styles.infoKey}
            valueStyle={styles.infoValue}
            divider={1}
          />
          <TouchableOpacity onPress={onConfirmLogout}>
            <KeyValueLabel
              disabled
              onPress={onConfirmLogout}
              containerStyle={styles.infoRow}
              keyLabel="Đăng xuất"
              valueLabel="v1.0.1"
              keyStyle={styles.logout}
              valueStyle={styles.infoValue}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

export const Profile = React.memo(_Profile);
