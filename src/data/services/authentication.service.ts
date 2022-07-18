import {AxiosInstance} from 'axios';
import {User} from '../models';
export class ApiAuthenticationService {
  constructor(private readonly provider: AxiosInstance) {}

  setAuthorizationHeader(token: string) {
    this.provider.defaults.headers.common.Authorization = token;
  }

  removeAuthorizationHeader() {
    delete this.provider.defaults.headers.common.Authorization;
  }

  async getUser(
    userId: string | number,
  ): Promise<{user?: User; errMessage?: string}> {
    try {
      const response = await this.provider.post(
        '/public/user/getLv2Detail?userId=' + userId,
      );
      if (!response?.data?.content) {
        return {errMessage: 'Đã có lỗi xảy ra, vui lòng thử lại sau'};
      }
      return {user: response.data.content};
    } catch (error: any) {
      this.removeAuthorizationHeader();
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
      if (!response?.data?.content) {
        return {errMessage: 'Đã có lỗi xảy ra, vui lòng thử lại sau'};
      }
      this.setAuthorizationHeader(response.data.content.token);
      return {user: response.data.content};
    } catch (error: any) {
      return {
        errMessage:
          error?.response?.data?.message ||
          'Đã có lỗi xảy ra, vui lòng thử lại sau',
      };
    }
  }

  async forgotPass(body: {
    phone: string;
    email: string;
  }): Promise<string | null> {
    try {
      await this.provider.post('/public/user/forgotPassword', body);
      return null;
    } catch (error: any) {
      return (
        error?.response?.data?.message ||
        'Đã có lỗi xảy ra, vui lòng thử lại sau'
      );
    }
  }

  async logout(id: string): Promise<string | null> {
    try {
      await this.provider.post('/logout/' + id);
      this.removeAuthorizationHeader();
      return null;
    } catch (error: any) {
      return (
        error?.response?.data?.message ||
        'Đã có lỗi xảy ra, vui lòng thử lại sau'
      );
    }
  }

  async deleteUser(): Promise<string | null> {
    try {
      await this.provider.post('/deleteAccount');
      this.removeAuthorizationHeader();
      return null;
    } catch (error: any) {
      return (
        error?.response?.data?.message ||
        'Đã có lỗi xảy ra, vui lòng thử lại sau'
      );
    }
  }

  async register(body: {
    phone: string;
    fullName: string;
    email: string;
    introCode: string;
    password: string;
  }): Promise<string | null> {
    try {
      await this.provider.post('/public/user/register', {
        ...body,
        env: 'MOBILE',
        roleCode: 'DOCTOR',
      });
      return null;
    } catch (error: any) {
      return (
        error?.response?.data?.message ||
        'Đã có lỗi xảy ra, vui lòng thử lại sau'
      );
    }
  }
}
