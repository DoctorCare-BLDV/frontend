import {PostImageAPI} from '@data/models';
import {AxiosInstance} from 'axios';
export class ApiUserService {
  constructor(private readonly provider: AxiosInstance) {}

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
