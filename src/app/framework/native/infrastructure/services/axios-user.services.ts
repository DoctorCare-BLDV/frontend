import axios from 'axios';
import {UserApiService} from '@data/services';

export const UserService = new UserApiService(axios);
