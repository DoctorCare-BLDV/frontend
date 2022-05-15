import {PostImageAPI, User} from '@data/models';
import {AxiosInstance} from 'axios';
export class UserApiService {
  constructor(private readonly provider: AxiosInstance) {}

  async updateProfile(body: {
    address?: string;
    bankAccount?: string;
    bankName?: string;
    fullName: string;
  }): Promise<{user?: User; errMessage?: string}> {
    try {
      const response = await this.provider.post(
        '/public/user/updateInfo',
        body,
      );
      return {user: response.data.content};
    } catch (error: any) {
      return {
        errMessage:
          error?.response?.data?.message ||
          'Đã có lỗi xảy ra, vui lòng thử lại sau',
      };
    }
  }

  async updateAvatar(avatar: PostImageAPI): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append('file', avatar);
      await this.provider.post('/public/user/uploadAvatar', formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      return null;
    } catch (error: any) {
      console.log('------', error?.response?.data);
      return (
        error?.response?.data?.message ||
        'Đã có lỗi xảy ra, vui lòng thử lại sau'
      );
    }
  }
}
