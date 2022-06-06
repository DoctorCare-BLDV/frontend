import axios from 'axios';
import {CustomersApiService} from '@data/services';

export const CustomerService = new CustomersApiService(axios);
