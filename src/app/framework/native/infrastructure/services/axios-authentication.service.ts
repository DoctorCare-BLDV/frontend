import axios from 'axios';
import {ApiAuthenticationService} from '@data/services';

export const AuthenticationService = new ApiAuthenticationService(axios);
