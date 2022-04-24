import {StyleSheet} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {AppDimensions, Colors} from '@app/resources';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  logo: {
    marginTop: isIphoneX() ? 70 : 30,
    width: 200,
    height: 200,
  },
  content: {
    alignItems: 'center',
  },
  inputContainer: {
    width: 250,
    backgroundColor: Colors.SILVER_BACKGROUND,
    height: 40,
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    marginTop: 20,
  },
  input: {
    fontSize: 14,
    height: 40,
  },
  buttonContainer: {
    width: 250,
    height: 40,
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  shadow: {
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  forgotContainer: {
    height: 'auto',
    marginTop: 15,
    paddingHorizontal: 30,
    alignSelf: 'center',
  },
  forgotPassText: {
    color: Colors.PRIMARY_ORAGE,
    fontWeight: '700',
  },
  registerContainer: {
    height: 'auto',
    marginTop: 10,
  },
  registerText: {
    color: Colors.PRIMARY_ORAGE,
    fontWeight: '700',
  },
  textLogo: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.PRIMARY_ORAGE,
  },
  textLogoRed: {
    color: Colors.PRIMARY_RED,
  },
  footer: {
    position: 'absolute',
    marginTop: AppDimensions.height - 100,
    alignItems: 'center',
    width: '100%',
  },
});
