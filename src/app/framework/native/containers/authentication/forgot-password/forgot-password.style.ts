import {Colors, Layout} from '@app/resources';
import {StyleSheet} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  logo: {
    width: 250,
    height: 250,
  },
  content: {
    alignItems: 'center',
    marginTop: 10,
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
    marginTop: 5,
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
    marginTop: 10,
  },
  forgotPassText: {
    fontSize: 14,
    color: Colors.PRIMARY_BLUE,
  },
  textLogo: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.PRIMARY_BLUE,
  },
  textLogoRed: {
    color: Colors.PRIMARY_RED,
  },
  footer: {
    position: 'absolute',
    bottom: getBottomSpace() + 15,
    zIndex: 2,
    alignItems: 'center',
    width: '100%',
  },
  spacing: {
    marginTop: 15,
  },

  info: {
    padding: Layout.spacingHorizontal,
  },
});
