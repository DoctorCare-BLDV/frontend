import axios from 'axios';
import {OrderAPIService} from '@data/services';

export const OrderService = new OrderAPIService(axios);
