import {AxiosInstance} from 'axios';

import {
  GetAllRevenueLevel2Request,
  MemberLevel2,
  TotalRevenueRequest,
  TotalRevenueType,
} from '@data/models';

export class RevenueApiService {
  constructor(private readonly provider: AxiosInstance) {}

  async getTotalRevenue(
    body: TotalRevenueRequest,
  ): Promise<{totalRevenue?: TotalRevenueType; errMessage?: string}> {
    try {
      const response = await this.provider.post(
        '/public/revenue/totalRevenue',
        body,
      );
      return {totalRevenue: response.data.content};
    } catch (error: any) {
      return {
        errMessage:
          error?.response?.data?.message ||
          'Đã có lỗi xảy ra, vui lòng thử lại sau',
      };
    }
  }
  async getRevenueByMonth(body: {
    time?: string;
  }): Promise<{revenueByMonth?: TotalRevenueType; errMessage?: string}> {
    try {
      const response = await this.provider.post(
        '/public/revenue/getRevenueByMonth',
        body,
      );
      return {revenueByMonth: response.data.content};
    } catch (error: any) {
      return {
        errMessage:
          error?.response?.data?.message ||
          'Đã có lỗi xảy ra, vui lòng thử lại sau',
      };
    }
  }
  async getRevenueLevel2(body: GetAllRevenueLevel2Request): Promise<{
    revenueLevel2?: Array<MemberLevel2>;
    lastPage?: number;
    errMessage?: string;
  }> {
    console.log(body);
    try {
      const {data} = await this.provider.post(
        '/public/revenue/getAllLevel2Revenue',
        body,
      );
      console.log('data', data);
      return {
        revenueLevel2: data?.content?.content || [],
        lastPage: data?.content?.totalPages || 1,
      };
    } catch (error: any) {
      return {
        errMessage:
          error?.response?.data?.message ||
          'Đã có lỗi xảy ra, vui lòng thử lại sau',
      };
    }
  }
}
