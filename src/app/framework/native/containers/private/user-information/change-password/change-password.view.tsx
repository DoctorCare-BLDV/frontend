import React from 'react';
import {View} from 'react-native';
// import from library
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import from alias
import {Header, PasswordInput, RoundedButton} from '@native/components';
import {Colors} from '@app/resources';
// localImport
import {useChangePasswordModel} from './change-password.hook';
import {ChangePasswordProps} from './change-password.type';
import {styles} from './change-password.style';

const _ChangePassword: React.FC<ChangePasswordProps> = props => {
  const {navigation} = props;
  const {
    oldPassword,
    newPassword,
    confirmNewPassword,
    loading,
    setNewPassword,
    setOldPassword,
    setConfirmNewPassword,
    submit,
  } = useChangePasswordModel();
  const isDisabled =
    !oldPassword ||
    !newPassword ||
    newPassword.length < 6 ||
    newPassword.length > 50 ||
    !confirmNewPassword ||
    loading;
  return (
    <View style={[styles.container]}>
      <Header leftOnpress={navigation.goBack} title="Thay đổi mật khẩu" />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.flex1}
        bounces={false}>
        <View style={styles.content}>
          <PasswordInput
            containerStyle={styles.inputContainer}
            inputProps={{
              onChangeText: value => setOldPassword(value),
              style: styles.input,
              editable: !loading,
              placeholder: 'Mật khẩu cũ',
              // placeholderTextColor: Colors.BLACK,
              autoCapitalize: 'none',
              autoCorrect: false,
              secureTextEntry: true,
            }}
          />
          <PasswordInput
            containerStyle={styles.inputContainer}
            inputProps={{
              onChangeText: value => setNewPassword(value),
              style: styles.input,
              editable: !loading,
              placeholder: `Mật khẩu mới (6 - 50} ký tự)`,
              // placeholderTextColor: Colors.BLACK,
              autoCapitalize: 'none',
              autoCorrect: false,
              secureTextEntry: true,
            }}
          />
          <PasswordInput
            containerStyle={styles.inputContainer}
            inputProps={{
              onChangeText: value => setConfirmNewPassword(value),
              style: styles.input,
              editable: !loading,
              placeholder: 'Nhập lại mật khẩu mới',
              // placeholderTextColor: Colors.BLACK,
              autoCapitalize: 'none',
              autoCorrect: false,
              secureTextEntry: true,
            }}
          />
          <View
            pointerEvents={isDisabled ? 'none' : 'auto'}
            style={styles.shadow}>
            <RoundedButton
              disabled={isDisabled}
              loading={loading}
              containerStyle={styles.buttonContainer}
              color={
                isDisabled
                  ? [Colors.GRAY, Colors.GRAY]
                  : [Colors.PRIMARY_ORANGE, Colors.PRIMARY_ORANGE]
              }
              title="Đổi mật khẩu"
              textStyle={styles.btnText}
              onPress={submit}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export const ChangePassword = React.memo(_ChangePassword);
