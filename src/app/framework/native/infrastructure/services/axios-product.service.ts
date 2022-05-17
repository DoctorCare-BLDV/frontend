import axios from 'axios';
import {ProductApiService} from '@data/services';

export const ProductService = new ProductApiService(axios);
