import React from 'react';
import {View} from 'react-native';
// import from library
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import from alias
import {
  FullScreenLoadingIndicator,
  Header,
  InputWithTitle,
  TextView,
} from '@native/components';
// localImport
import {useEditProfileModel} from './edit-profile.hook';
import {EditProfileProps} from './edit-profile.type';
import {styles} from './edit-profile.style';

const _EditProfile: React.FC<EditProfileProps> = props => {
  const {} = props;
  const {name, address, loading, bankAccount, bankName, onSubmit, user} =
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
          inputProps={{
            defaultValue: user?.bankAccount || '',
          }}
          type="input"
          title="Số tài khoản ngân hàng"
          onChangeText={e => {
            bankAccount.current = e;
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export const EditProfile = React.memo(_EditProfile);
