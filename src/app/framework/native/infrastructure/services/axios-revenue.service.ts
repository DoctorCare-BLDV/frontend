import {RevenueApiService} from '@data/services';
import axios from 'axios';

export const RevenueService = new RevenueApiService(axios);
