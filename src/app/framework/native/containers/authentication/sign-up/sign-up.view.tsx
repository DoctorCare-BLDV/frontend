import React from 'react';
import {View} from 'react-native';
// import from library
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Animated, {Easing} from 'react-native-reanimated';
import {CheckBox} from 'react-native-elements';
// import from alias
import {
  NormalHeader,
  PasswordInput,
  RoundedButton,
  TextField,
  TextView,
} from '@native/components';
import {Colors} from '@app/resources';
// localImport
import {useSignUpModel} from './sign-up.hook';
import {SignUpProps} from './sign-up.type';
import {styles} from './sign-up.style';

const useAnimation = () => {
  const {opacity, tranY, tranYStyle, opacityStyle} = React.useMemo(() => {
    const _opacity = new Animated.Value<number>(1);
    const _tranY = new Animated.Value<number>(0);
    const _opacityStyle = {opacity: _opacity};
    const _tranYStyle = {transform: [{translateY: _tranY}]};
    return {
      opacity: _opacity,
      tranY: _tranY,
      tranYStyle: _tranYStyle,
      opacityStyle: _opacityStyle,
    };
  }, []);

  const animating = React.useCallback(async () => {
    Animated.timing(tranY, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
    }).start();
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
      }).start();
    }, 100);
  }, [opacity, tranY]);

  const reset = React.useCallback(async () => {
    tranY.setValue(-60);
    opacity.setValue(0);
  }, [opacity, tranY]);

  return {
    animating,
    tranYStyle,
    opacityStyle,
    reset,
  };
};

const _SignUp: React.FC<SignUpProps> = props => {
  const {navigation} = props;
  const {} = useSignUpModel();
  const {opacityStyle, tranYStyle} = useAnimation();
  return (
    <View style={[styles.container]}>
      <NormalHeader leftOnpress={navigation.goBack} title="Đăng ký" />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.flex1}
        bounces={false}>
        <View style={styles.content}>
          <TextField
            containerStyle={styles.inputContainer}
            inputProps={{
              // onChangeText: value => (phone.current = value),
              style: styles.input,
              // editable: !isVerifying,
              keyboardType: 'phone-pad',
              placeholder: 'Số điện thoại *',
              // placeholderTextColor: Colors.BLACK,
            }}
          />
          <TextField
            containerStyle={styles.inputContainer}
            inputProps={{
              // onChangeText: value => (name.current = value),
              style: styles.input,
              // editable: !isVerifying,
              placeholder: 'Họ và tên *',
              // placeholderTextColor: Colors.BLACK,
            }}
          />
          <TextField
            containerStyle={styles.inputContainer}
            inputProps={{
              // editable: !isVerifying,
              style: styles.input,
              placeholder: 'Email *',
              // onChangeText: value => (email.current = value),
              // placeholderTextColor: Colors.BLACK,
              autoCapitalize: 'none',
              autoCorrect: false,
            }}
          />
          <PasswordInput
            containerStyle={styles.inputContainer}
            inputProps={{
              // editable: !isVerifying,
              style: styles.input,
              placeholder: `Mật khẩu * (6 - 50 ký tự)`,
              // onChangeText: value => (password.current = value),
              // placeholderTextColor: Colors.BLACK,
              autoCapitalize: 'none',
              autoCorrect: false,
              secureTextEntry: true,
            }}
          />
          <PasswordInput
            containerStyle={styles.inputContainer}
            inputProps={{
              // editable: !isVerifying,
              style: styles.input,
              placeholder: 'Nhập lại mật khẩu *',
              // onChangeText: value => (confirmPassword.current = value),
              // placeholderTextColor: Colors.BLACK,
              autoCapitalize: 'none',
              autoCorrect: false,
              secureTextEntry: true,
            }}
          />
          <TextField
            containerStyle={styles.inputContainer}
            inputProps={{
              // onChangeText: value => (refCode.current = value),
              style: styles.input,
              // editable: !isVerifying,
              placeholder: 'Mã giới thiệu',
              // placeholderTextColor: Colors.BLACK,
            }}
          />
          <Animated.View style={opacityStyle}>
            <TextField
              containerStyle={styles.inputContainer}
              inputProps={{
                // onChangeText: value => (otp.current = value),
                style: styles.input,
                maxLength: 6,
                // editable: isVerifying,
                // value: !isVerifying ? '' : undefined,
                keyboardType: 'phone-pad',
                placeholder: 'OTP',
                // placeholderTextColor: Colors.BLACK,
              }}
            />
          </Animated.View>
          <Animated.View style={tranYStyle}>
            <View style={styles.shadow}>
              <RoundedButton
                // disabled={disabledBtn}
                loading={false}
                containerStyle={styles.buttonContainer}
                color={[Colors.PRIMARY_ORAGE, Colors.PRIMARY_ORAGE]}
                // color={
                //   disabledBtn
                //     ? [Colors.GRAY, Colors.GRAY]
                //     : [Colors.PRIMARY_BLUE, Colors.PRIMARY_BLUE]
                // }
                title="Đăng ký"
                textStyle={styles.btnText}
                onPress={() => {}}
              />
            </View>
            <View style={styles.btnPolicy}>
              <CheckBox
                size={16}
                // onPress={toggleBtn}
                containerStyle={styles.checkbox}
                // checked={!disabledBtn}
              />
              <TextView style={styles.textPolicy}>
                {'Đồng ý '}
                <TextView onPress={() => {}} style={styles.underline}>
                  {'điều khoản sử dụng'}
                </TextView>
              </TextView>
            </View>
          </Animated.View>
          <View style={styles.spacing} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export const SignUp = React.memo(_SignUp);
