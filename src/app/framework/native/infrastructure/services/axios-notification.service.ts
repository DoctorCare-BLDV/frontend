import axios from 'axios';
import {NotificationApiService} from '@data/services';

export const NotificationService = new NotificationApiService(axios);
