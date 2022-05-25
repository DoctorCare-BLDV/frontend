import {
  AddOrderApiRequest,
  AddOrderAPIResponse,
  ApiRequestor,
  IOrder,
} from '@data/models';
import {AxiosInstance} from 'axios';
export class OrderAPIService {
  constructor(private readonly provider: AxiosInstance) {}

  async fetchOrder(body: {
    status?: string;
    keyword?: string;
    pageIndex: number;
  }): Promise<{order: IOrder[]; lastPage?: number; errorMessage?: string}> {
    try {
      let params: any = {
        pageIndex: body.pageIndex - 1,
        pageSize: 20,
        filterValues: {},
      };
      if (body.keyword) {
        params.filterValues.keyword = body.keyword;
      }
      if (body.status) {
        params.filterValues.status = body.status;
      }
      const {data} = await this.provider.post('/public/order/getAll', params);
      return {
        order: data?.content?.content || [],
        lastPage: data?.content?.totalPages || 1,
      };
    } catch (error: any) {
      return {
        order: [],
        errorMessage:
          error?.response?.data?.message ||
          'Đã có lỗi xảy ra, vui lòng thử lại sau',
      };
    }
  }

  async updateStatus(body: {
    orderId: number;
    status: number;
  }): Promise<string | null> {
    try {
      await this.provider.post('/public/order/updateStatus', body);
      return null;
    } catch (error: any) {
      return (
        error?.response?.data?.message ||
        'Đã có lỗi xảy ra, vui lòng thử lại sau'
      );
    }
  }

  addOrder(body: AddOrderApiRequest): ApiRequestor<AddOrderAPIResponse> {
    const controller = new AbortController();

    return {
      cancel: () => controller.abort(),
      request: () =>
        this.provider.post('/public/order/add', body, {
          signal: controller.signal,
        }),
    };
  }

  async fetchOrderDetail(
    orderId: number,
  ): Promise<{order?: IOrder; errorMessage: string}> {
    try {
      const {data} = await this.provider.post(
        '/public/order/getDetailById/' + orderId,
      );
      return {
        order: data?.content,
        errorMessage: '',
      };
    } catch (error: any) {
      return {
        errorMessage:
          error?.response?.data?.message ||
          'Đã có lỗi xảy ra, vui lòng thử lại sau',
      };
    }
  }
}
