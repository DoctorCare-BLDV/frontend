import {AxiosInstance} from 'axios';

import {TotalRevenueRequest, TotalRevenueType} from '@data/models';

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
  }): Promise<{getRevenueByMonth?: TotalRevenueType; errMessage?: string}> {
    try {
      const response = await this.provider.post(
        '/public/revenue/getRevenueByMonth',
        body,
      );
      return {getRevenueByMonth: response.data.content};
    } catch (error: any) {
      return {
        errMessage:
          error?.response?.data?.message ||
          'Đã có lỗi xảy ra, vui lòng thử lại sau',
      };
    }
  }
}
