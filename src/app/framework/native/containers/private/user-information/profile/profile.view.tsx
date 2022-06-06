import React from 'react';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
// import from library
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {Icon} from '@fortawesome/fontawesome-svg-core';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Divider} from 'react-native-elements';
// import from alias
import {useUser} from '@app/shared/contexts';
import {
  IconLabel,
  ImagePicker,
  KeyValueLabel,
  TextView,
} from '@native/components';
import {callPhone, copyText} from '@app/utils';
import {Colors} from '@app/resources';
// localImport
import {useProfileModel} from './profile.hook';
import {ProfileProps} from './profile.type';
import {styles} from './profile.style';
import {Header} from './components';

const _INFO = [
  {key: 'Số điện thoại', value: 'phone', hasAction: false},
  {key: 'Email', value: 'email', hasAction: false},
  {
    key: 'Mã giới thiệu',
    value: 'myIntroCode',
    hasAction: true,
  },
  {key: 'Địa chỉ', value: 'address', hasAction: false},
];

const _Profile: React.FC<ProfileProps> = props => {
  const {navigation} = props;
  const {
    onConfirmLogout,
    fetchUser,
    isPhotoPickerVisible,
    setPhotoPickerVisible,
  } = useProfileModel();
  const {user, onUpdateAvatar} = useUser();

  const navigateToEditScreen = React.useCallback(() => {
    navigation.navigate('EditProfile');
  }, [navigation]);

  const goToChangePassword = React.useCallback(() => {
    navigation.navigate('ChangePassword');
  }, [navigation]);

  return (
    <>
      <View style={[styles.container]}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={fetchUser} />
          }
          showsVerticalScrollIndicator={false}>
          <Header onSelectImg={() => setPhotoPickerVisible(true)} />
          <TouchableOpacity
            onPress={navigateToEditScreen}
            style={styles.editBtn}>
            <FontAwesomeIcon
              color={Colors.PRIMARY_ORANGE}
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
          <KeyValueLabel
            containerStyle={styles.infoRow}
            keyLabel={'Thông tin ngân hàng:'}
            valueLabel={
              !!user?.bankAccount
                ? user.bankAccount + '\n' + user.bankName
                : 'Chưa có thông tin ngân hàng'
            }
            keyStyle={styles.infoKey}
            valueStyle={styles.infoValue}
            divider={1}
          />
          <TouchableOpacity activeOpacity={1} onPress={goToChangePassword}>
            <IconLabel
              containerStyle={styles.achievement}
              labelStyle={styles.copyright}
              text={'Đổi mật khẩu'}
              suffix={<FontAwesome5Icon name="chevron-right" />}
            />
            <Divider />
          </TouchableOpacity>
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
        <ImagePicker
          visible={isPhotoPickerVisible}
          onDone={onUpdateAvatar}
          onClose={() => setPhotoPickerVisible(false)}
        />
      </View>
    </>
  );
};

export const Profile = React.memo(_Profile);
