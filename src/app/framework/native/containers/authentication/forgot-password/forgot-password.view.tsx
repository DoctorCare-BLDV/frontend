import React from 'react';
import {View} from 'react-native';
// import from library
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import from alias
import {Header, RoundedButton, TextField, TextView} from '@native/components';
import {Colors} from '@app/resources';
// localImport
import {useForgotPasswordModel} from './forgot-password.hook';
import {ForgotPasswordProps} from './forgot-password.type';
import {styles} from './forgot-password.style';

const MESSAGES = {
  INFO: 'Vui lòng điền chính xác những thông tin sau, chúng tôi sẽ gửi mật khẩu mới qua email mà bạn đã đăng ký cho số điện thoại của bạn.',
  CONFIRM: 'Xác nhận',
};

const _ForgotPassword: React.FC<ForgotPasswordProps> = props => {
  const {navigation} = props;
  const {loading, phone, email, setPhone, setEmail, submit, isDisabled} =
    useForgotPasswordModel();

  return (
    <View style={[styles.container]}>
      <Header leftOnpress={navigation.goBack} title="Quên mật khẩu" />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.flex1}
        bounces={false}>
        <TextView style={styles.info}>{MESSAGES.INFO}</TextView>
        <View style={styles.content}>
          <TextField
            containerStyle={styles.inputContainer}
            inputProps={{
              value: phone,
              onChangeText: value => setPhone(value),
              style: styles.input,
              editable: !loading,
              keyboardType: 'phone-pad',
              placeholder: 'Số điện thoại',
              // placeholderTextColor: Colors.BLACK,
            }}
          />
          <TextField
            containerStyle={styles.inputContainer}
            inputProps={{
              value: email,
              onChangeText: value => setEmail(value),
              style: styles.input,
              editable: !loading,
              placeholder: 'Email',
              // placeholderTextColor: Colors.BLACK,
              autoCapitalize: 'none',
              autoCorrect: false,
            }}
          />
          <View
            pointerEvents={isDisabled ? 'none' : 'auto'}
            style={styles.shadow}>
            <RoundedButton
              loading={loading}
              containerStyle={styles.buttonContainer}
              color={
                isDisabled
                  ? [Colors.GRAY, Colors.GRAY]
                  : [Colors.PRIMARY_ORAGE, Colors.PRIMARY_ORAGE]
              }
              title={MESSAGES.CONFIRM}
              textStyle={styles.btnText}
              onPress={submit}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export const ForgotPassword = React.memo(_ForgotPassword);
