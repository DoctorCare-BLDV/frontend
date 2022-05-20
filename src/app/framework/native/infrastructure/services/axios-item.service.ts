import axios from 'axios';
import {ItemApiService} from '@data/services';

export const ItemService = new ItemApiService(axios);
