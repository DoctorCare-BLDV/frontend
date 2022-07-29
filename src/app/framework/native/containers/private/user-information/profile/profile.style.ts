import {StyleSheet} from 'react-native';
import {Colors} from '@app/resources';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: 40,
  },
  avatar: {
    borderWidth: 3,
    borderColor: Colors.BLUE,
    alignSelf: 'center',
    marginTop: 30,
    overflow: 'hidden',
  },
  name: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 16,
  },
  uploadAvatarIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: Colors.BLUE,
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRow: {
    margin: 16,
  },
  infoRowCenter: {
    margin: 16,
    alignItems: 'center',
  },
  infoKey: {
    fontSize: 14,
    color: Colors.BLACK,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.BLACK,
  },
  copyrightWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.SILVER_BACKGROUND,
  },
  logo: {
    fontWeight: '500',
    fontSize: 15,
    color: Colors.PRIMARY_ORANGE,
  },
  achievement: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.WHITE,
  },
  logout: {
    color: Colors.RED,
    fontWeight: '600',
    fontSize: 14,
  },
  deleteAccount: {
    color: Colors.RED,
    fontWeight: '600',
    fontSize: 14,
    marginHorizontal: 0,
  },
  copyright: {
    marginHorizontal: 0,
    fontSize: 14,
    color: Colors.BLACK,
  },
  textStyle: {
    fontSize: 14,
  },
  editBtn: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
  editText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PRIMARY_BLUE,
  },
  maskAvatar: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.BLACK_60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
