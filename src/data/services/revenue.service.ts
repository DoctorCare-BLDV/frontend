import {AxiosInstance} from 'axios';

import {TotalRevenueRequest, TotalRevenueType} from '@data/models';

export class RevenueApiService {
  constructor(private readonly provider: AxiosInstance) {}

  async getTotalRevenie(
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
}
