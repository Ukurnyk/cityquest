module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@screens': './src/screens',
            '@components': './src/components',
            '@navigation': './src/navigation',
            '@types': './src/types',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
            '@services': './src/services',
            '@assets': './src/assets',
          },
        },
      ],
      'react-native-config',
    ],
  };
};
