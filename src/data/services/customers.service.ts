import {AxiosInstance} from 'axios';
import {GetAllCustomersResponse, ICustomer} from '@data/models';

export class CustomersApiService {
  constructor(private readonly provider: AxiosInstance) {}
  async fetchCustomersLevel2(body: {
    keyword?: string;
    pageIndex: number;
  }): Promise<{
    customersLevel2: ICustomer[];
    lastPage?: number;
    errorMessage?: string;
  }> {
    try {
      let params: any = {
        pageIndex: body.pageIndex - 1,
        pageSize: 20,
        filterValues: {},
      };
      if (body.keyword) {
        params.filterValues.fullName = body.keyword;
      }
      const {data} = await this.provider.post('/public/user/getAll', params);
      return {
        customersLevel2: data?.content?.content || [],
        lastPage: data?.content?.totalPages || 1,
      };
    } catch (error: any) {
      return {
        customersLevel2: [],
        errorMessage:
          error?.response?.data?.message ||
          'Đã có lỗi xảy ra, vui lòng thử lại sau',
      };
    }
  }
  async fetchAllCustomers(body: {
    keyword?: string;
    pageIndex: number;
    doctorId?: number;
  }): Promise<{
    allCustomers: GetAllCustomersResponse[];
    lastPage?: number;
    errorMessage?: string;
  }> {
    try {
      let params: any = {
        pageIndex: body.pageIndex - 1,
        pageSize: 10,
        filterValues: {},
      };
      if (body.keyword) {
        params.filterValues.keyword = body.keyword;
      }
      if (body.doctorId) {
        params.filterValues.doctorId = body.doctorId;
      }
      const {data} = await this.provider.post(
        '/public/user/getAllCustomer',
        params,
      );
      return {
        allCustomers: data?.content?.content || [],
        lastPage: data?.content?.totalPages || 1,
      };
    } catch (error: any) {
      return {
        allCustomers: [],
        errorMessage:
          error?.response?.data?.message ||
          'Đã có lỗi xảy ra, vui lòng thử lại sau',
      };
    }
  }
  async fetchCustomerDetail(
    customerId: number,
  ): Promise<{customer?: ICustomer; errorMessage: string}> {
    try {
      const {data} = await this.provider.post(
        '/public/user/getLv2Detail?userId=' + customerId,
      );
      return {
        customer: data?.content,
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
