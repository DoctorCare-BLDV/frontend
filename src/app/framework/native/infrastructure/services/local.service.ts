import AsyncStorage from '@react-native-community/async-storage';

export class _LocalService {
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

export const LocalService = new _LocalService();
