const pak = require('./package.json');
const path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          [pak.name]: path.join(__dirname, 'src'),
        },
      },
    ],
  ],
};
