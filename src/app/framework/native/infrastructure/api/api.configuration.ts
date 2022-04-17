import axios from 'axios';
import {NativeBuildConfig} from '../config';

export function configureApiProvider() {
  axios.defaults.baseURL = NativeBuildConfig.ApiUrl;
}
