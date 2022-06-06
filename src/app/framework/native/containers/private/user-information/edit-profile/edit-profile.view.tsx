import React from 'react';
import {View} from 'react-native';
// import from library
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {Icon} from '@fortawesome/fontawesome-svg-core';
// import from alias
import {
  FullScreenLoadingIndicator,
  Header,
  InputWithTitle,
  TextView,
} from '@native/components';
import {Colors} from '@app/resources';
// localImport
import {useEditProfileModel} from './edit-profile.hook';
import {EditProfileProps} from './edit-profile.type';
import {styles} from './edit-profile.style';

const _EditProfile: React.FC<EditProfileProps> = props => {
  const {} = props;
  const {name, address, email, loading, bankAccount, bankName, onSubmit, user} =
    useEditProfileModel();

  return (
    <View style={styles.container}>
      <Header
        leftOnpress={props.navigation.goBack}
        title={'Sửa thông tin'}
        rightOnpress={onSubmit}
        rightComponent={<TextView style={styles.saveText}>{'Lưu'}</TextView>}
      />
      <FullScreenLoadingIndicator visible={loading} />
      <KeyboardAwareScrollView style={styles.container}>
        <InputWithTitle
          requried
          inputProps={{
            defaultValue: user?.fullName || '',
          }}
          type="input"
          title="Tên"
          onChangeText={e => {
            name.current = e;
          }}
        />
        <InputWithTitle
          requried
          inputProps={{
            defaultValue: user?.email || '',
          }}
          type="input"
          title="Email"
          onChangeText={e => {
            email.current = e;
          }}
        />
        <InputWithTitle
          requried
          inputProps={{
            defaultValue: user?.address || '',
          }}
          type="input"
          title="Địa chỉ"
          onChangeText={e => {
            address.current = e;
          }}
        />
        <InputWithTitle
          disabled
          inputProps={{
            defaultValue: user?.bankName || '',
          }}
          type="input"
          title="Tên ngân hàng"
          onChangeText={e => {
            bankName.current = e;
          }}
        />
        <InputWithTitle
          disabled
          inputProps={{
            defaultValue: user?.bankAccount || '',
          }}
          type="input"
          title="Số tài khoản ngân hàng"
          onChangeText={e => {
            bankAccount.current = e;
          }}
        />
        <View style={styles.alertWrapper}>
          <FontAwesomeIcon
            color={Colors.PRIMARY_ORANGE}
            icon={faTriangleExclamation as Icon}
          />
          <TextView style={styles.alertText}>
            {
              'Bạn không thể tự đổi thông tin ngân hàng, vui lòng liên hệ với admin để được hỗ trợ.'
            }
          </TextView>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export const EditProfile = React.memo(_EditProfile);
