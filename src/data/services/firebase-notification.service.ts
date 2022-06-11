import {requestNoticationPermission} from '@app/utils';
import {AxiosInstance} from 'axios';
import messaging from '@react-native-firebase/messaging';

export class NotificationFirebaseService {
  constructor(private readonly provider: AxiosInstance) {}

  async updateFcmToken(_token?: string): Promise<string | undefined> {
    try {
      let token = _token;
      if (!token) {
        const accepted = await requestNoticationPermission();
        if (!accepted) return undefined;
        token = await messaging().getToken();
      }
      await this.provider.post('/saveOfUpdateFcmToken?fcmToken=' + token);
      return undefined;
    } catch (error: any) {
      console.log('----error', error);
      return (
        error?.response?.data?.message ||
        'Đã có lỗi xảy ra, vui lòng thử lại sau'
      );
    }
  }

  async deleteFcmToken(userId: string): Promise<string | undefined> {
    try {
      const accepted = await requestNoticationPermission();
      if (!accepted) return undefined;
      const token = await messaging().getToken();
      await this.provider.post(
        `/deleteFcmToken?fcmToken=${token}&userId=${userId}`,
      );
      return undefined;
    } catch (error: any) {
      console.log('----error', error);
      return (
        error?.response?.data?.message ||
        'Đã có lỗi xảy ra, vui lòng thử lại sau'
      );
    }
  }
}
