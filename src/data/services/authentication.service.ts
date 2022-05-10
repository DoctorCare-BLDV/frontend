import {AxiosInstance} from 'axios';
import {User} from '../models';
export class ApiAuthenticationService {
  constructor(private readonly provider: AxiosInstance) {}

  async getUser(
    userId: string | number,
  ): Promise<{user?: User; errMessage?: string}> {
    try {
      const response = await this.provider.post(
        '/public/user/getLv2Detail?userId=',
        userId,
      );
      if (!response?.data?.content)
        return {errMessage: 'Đã có lỗi xảy ra, vui lòng thử lại sau'};
      return {user: response.data.content};
    } catch (error: any) {
      return {
        errMessage:
          error?.response?.data?.message ||
          'Đã có lỗi xảy ra, vui lòng thử lại sau',
      };
    }
  }
  async login(body: {
    phone: string;
    password: string;
  }): Promise<{user?: User; errMessage?: string}> {
    try {
      const response = await this.provider.post('/login', body);
      if (!response?.data?.content)
        return {errMessage: 'Đã có lỗi xảy ra, vui lòng thử lại sau'};
      return {user: response.data.content};
    } catch (error: any) {
      return {
        errMessage:
          error?.response?.data?.message ||
          'Đã có lỗi xảy ra, vui lòng thử lại sau',
      };
    }
  }
}
