import React from 'react';
import {Image, View} from 'react-native';
// import from library
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Animated, {Easing} from 'react-native-reanimated';
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

const _SignIn: React.FC<SignInProps> = props => {
  const {navigation} = props;
  const {opacityStyle, tranYStyle} = useAnimation();
  const {} = useSignInModel();

  const navigateToSignUp = React.useCallback(() => {
    navigation.navigate('SignUp');
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
              // editable: !isVerifying,
              style: styles.input,
              placeholder: 'Số điện thoại',
              // onChangeText: value => (phone.current = value),
              // placeholderTextColor: Colors.BLACK,
              keyboardType: 'phone-pad',
            }}
          />
          <Animated.View style={opacityStyle}>
            <PasswordInput
              containerStyle={styles.inputContainer}
              inputProps={{
                style: styles.input,
                maxLength: 16,
                // value: password,
                // onChangeText: value => setPassword(value),
                placeholder: 'Mật khẩu',
                secureTextEntry: true,
                // editable: !isVerifying,
                // placeholderTextColor: Colors.BLACK,
                autoCapitalize: 'none',
                autoCorrect: false,
              }}
            />
          </Animated.View>
          <Animated.View style={tranYStyle}>
            <View
              // pointerEvents={isDisabled ? 'none' : 'auto'}
              style={styles.shadow}>
              <RoundedButton
                color={[Colors.PRIMARY_ORAGE, Colors.PRIMARY_ORAGE]}
                loading={false}
                containerStyle={styles.buttonContainer}
                // color={
                //   isDisabled
                //     ? [
                //         LightTheme.colorScheme.inactive,
                //         LightTheme.colorScheme.inactive,
                //       ]
                //     : [Colors.PRIMARY_BLUE, Colors.PRIMARY_BLUE]
                // }
                // title={isVerifying ? 'Xác minh' : 'Đăng nhập'}
                title={'Đăng nhập'}
                textStyle={styles.btnText}
                onPress={() => {}}
              />
            </View>
            <FlatButton
              onPress={() => {}}
              title={'Quên mật khẩu'}
              containerStyle={styles.forgotContainer}
              textStyle={styles.forgotPassText}
            />
          </Animated.View>
        </View>
        <View style={styles.footer}>
          <TextView style={{color: Colors.GRAY}} text={'hoặc'} />
          <FlatButton
            onPress={navigateToSignUp}
            title="Đăng kí tài khoản mới"
            containerStyle={styles.registerContainer}
            textStyle={styles.registerText}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export const SignIn = React.memo(_SignIn);
