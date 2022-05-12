import AsyncStorage from '@react-native-community/async-storage';

export class _UserLocalService {
  removeAuthenInfor() {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('userId');
  }

  saveAuthenInfor(body: {token: string; userId: number}) {
    AsyncStorage.setItem('token', body.token);
    AsyncStorage.setItem('userId', body.userId.toString());
  }

  clearLocalData() {
    AsyncStorage.clear();
  }

  async getItem(key: string) {
    return await AsyncStorage.getItem(key);
  }
}

export const UserLocalService = new _UserLocalService();
