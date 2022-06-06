import React, {useCallback} from 'react';
import {Image, View} from 'react-native';
// import from library
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import from alias
import {
  FlatButton,
  PasswordInput,
  RoundedButton,
  TextField,
  TextView,
} from '@native/components';
import {Colors} from '@app/resources';
// localImport
import {useSignInModel} from './sign-in.hook';
import {SignInProps} from './sign-in.type';
import {styles} from './sign-in.style';

const _SignIn: React.FC<SignInProps> = props => {
  const {navigation} = props;
  const {phone, password, onSubmit, loading} = useSignInModel();

  const navigateForgotPassScreen = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.flexGrow1}
        style={styles.flex1}
        bounces={false}>
        <View style={styles.content}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://whenindanang.com/wp-content/uploads/2020/11/logo-designs-that-you-may-fall-in-love-with-7.png',
            }}
            resizeMethod="scale"
            resizeMode="contain"
          />
          <TextView style={styles.textLogo}>
            {'Doctor Care'}
            {/* <TextView style={styles.textLogoRed}>{' ĐẤT VIỆT'}</TextView> */}
          </TextView>
          <TextField
            containerStyle={styles.inputContainer}
            inputProps={{
              style: styles.input,
              placeholder: 'Số điện thoại',
              onChangeText: value => (phone.current = value),
              keyboardType: 'phone-pad',
            }}
          />
          <View>
            <PasswordInput
              containerStyle={styles.inputContainer}
              inputProps={{
                style: styles.input,
                maxLength: 16,
                onChangeText: value => (password.current = value),
                placeholder: 'Mật khẩu',
                secureTextEntry: true,
                autoCapitalize: 'none',
                autoCorrect: false,
              }}
            />
          </View>
          <View>
            <View style={styles.shadow}>
              <RoundedButton
                color={[Colors.PRIMARY_ORANGE, Colors.PRIMARY_ORANGE]}
                loading={loading}
                containerStyle={styles.buttonContainer}
                title={'Đăng nhập'}
                textStyle={styles.btnText}
                onPress={onSubmit}
              />
            </View>
            <FlatButton
              onPress={navigateForgotPassScreen}
              title={'Quên mật khẩu'}
              containerStyle={styles.forgotContainer}
              textStyle={styles.forgotPassText}
            />
          </View>
        </View>
        {/* <View style={styles.footer}>
          <TextView style={{color: Colors.GRAY}} text={'hoặc'} />
          <FlatButton
            onPress={navigateToSignUp}
            title="Đăng kí tài khoản mới"
            containerStyle={styles.registerContainer}
            textStyle={styles.registerText}
          />
        </View> */}
      </KeyboardAwareScrollView>
    </View>
  );
};

export const SignIn = React.memo(_SignIn);
