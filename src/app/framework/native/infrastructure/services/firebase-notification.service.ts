import axios from 'axios';
import {NotificationFirebaseService} from '@data/services';

export const FirebaseService = new NotificationFirebaseService(axios);
