import axios from 'axios';
import {AddressApiService} from '@data/services';

export const AddressService = new AddressApiService(axios);
