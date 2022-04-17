module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          // Top Level alias
          '@assets': './assets',
          '@app': './src/app/',
          '@native': './src/app/framework/native/',
          '@core': './src/core',
          '@data': './src/data/',
        },
      },
    ],
  ],
};
