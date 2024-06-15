module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@i18n': './src/i18n/index.ts',
          '@config': './src/config',
          '@hooks': './src/hooks',
          '@modules': './src/modules',
          '@navigators': './src/navigators',
          '@query': './src/react-query',
          '@storage': './src/storage',
          '@store': './src/store',
          '@constants': './src/constants',
          '@utils': './src/utils',
          '@assets': './assets',
          '@core': './core',
          '@core/entities': './core/domain/entities',
          '@core/fixture': './core/fixtures',
          '@core/usecases': './core/usecases',
          '@core/real': './core/adapters/real',
          '@core/inmemory': './core/adapters/inmemory',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
