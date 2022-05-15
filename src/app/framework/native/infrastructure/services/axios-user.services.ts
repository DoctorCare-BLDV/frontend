import axios from 'axios';
import {ApiUserService} from '@data/services';

export const UserService = new ApiUserService(axios);
