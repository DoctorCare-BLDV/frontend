import {AxiosInstance} from 'axios';
import {User} from '../models';
export class ApiAuthenticationService {
  constructor(private readonly provider: AxiosInstance) {}
  getUser(): Promise<User> {
    return Promise.resolve({id: 1111});
  }
}
