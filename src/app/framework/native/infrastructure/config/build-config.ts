import Config from 'react-native-config';
import {BuildConfig} from '@core';

export const NativeBuildConfig: BuildConfig = {
  ApiUrl: Config.API_URL,
  EnvSuffix: Config.ENV_SUFFIX,
  bundleId: Config.BUNDLE_ID,
};
