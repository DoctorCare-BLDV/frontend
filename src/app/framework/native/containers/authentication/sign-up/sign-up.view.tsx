import React, {useState} from 'react';
import {View} from 'react-native';
// import from library
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Animated, {Easing} from 'react-native-reanimated';
import {CheckBox} from 'react-native-elements';
// import from alias
import {
  Header,
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
  const {
    email,
    name,
    phone,
    refCode,
    password,
    confirmPassword,
    onSubmit,
    openPolicyLink,
    loading,
  } = useSignUpModel(props);
  const [checked, setChecked] = useState<boolean>(true);
  const {tranYStyle} = useAnimation();
  return (
    <View style={[styles.container]}>
      <Header leftOnpress={navigation.goBack} title="????ng k??" />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.flex1}
        bounces={false}>
        <View style={styles.content}>
          <TextField
            containerStyle={styles.inputContainer}
            inputProps={{
              onChangeText: value => (phone.current = value),
              style: styles.input,
              keyboardType: 'phone-pad',
              placeholder: 'S??? ??i???n tho???i *',
            }}
          />
          <TextField
            containerStyle={styles.inputContainer}
            inputProps={{
              onChangeText: value => (name.current = value),
              style: styles.input,
              placeholder: 'H??? v?? t??n *',
            }}
          />
          <TextField
            containerStyle={styles.inputContainer}
            inputProps={{
              style: styles.input,
              placeholder: 'Email *',
              onChangeText: value => (email.current = value),
              autoCapitalize: 'none',
              autoCorrect: false,
            }}
          />
          <PasswordInput
            containerStyle={styles.inputContainer}
            inputProps={{
              style: styles.input,
              placeholder: `M???t kh???u * (6 - 50 k?? t???)`,
              onChangeText: value => (password.current = value),
              // placeholderTextColor: Colors.BLACK,
              autoCapitalize: 'none',
              autoCorrect: false,
              secureTextEntry: true,
            }}
          />
          <PasswordInput
            containerStyle={styles.inputContainer}
            inputProps={{
              style: styles.input,
              placeholder: 'Nh???p l???i m???t kh???u *',
              onChangeText: value => (confirmPassword.current = value),
              // placeholderTextColor: Colors.BLACK,
              autoCapitalize: 'none',
              autoCorrect: false,
              secureTextEntry: true,
            }}
          />
          <TextField
            containerStyle={styles.inputContainer}
            inputProps={{
              onChangeText: value => (refCode.current = value),
              style: styles.input,
              placeholder: 'M?? gi???i thi???u',
              defaultValue: 'DCMANAGER',
            }}
          />
          <Animated.View style={tranYStyle}>
            <View style={styles.shadow}>
              <RoundedButton
                disabled={!checked}
                loading={loading}
                color={
                  !checked
                    ? [Colors.GRAY, Colors.GRAY]
                    : [Colors.PRIMARY_ORANGE, Colors.PRIMARY_ORANGE]
                }
                containerStyle={styles.buttonContainer}
                title="????ng k??"
                textStyle={styles.btnText}
                onPress={onSubmit}
              />
            </View>
            <View style={styles.btnPolicy}>
              <CheckBox
                size={16}
                containerStyle={styles.checkbox}
                checked={checked}
                onPress={() => setChecked(pre => !pre)}
              />
              <TextView style={styles.textPolicy}>
                {'?????ng ?? '}
                <TextView onPress={openPolicyLink} style={styles.underline}>
                  {'??i???u kho???n s??? d???ng'}
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
