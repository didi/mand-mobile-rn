// https://github.com/storybooks/storybook/issues/1946
// storybook for react-native-web

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = ({ config }, configType) => {
  config.resolve = {
    modules: ['node_modules'],
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    alias: Object.assign({
      '@demo': resolve('./demo/'),
      'react-native': 'react-native-web',
      MDPopup: 'mand-mobile-rn/dist/component/popup/index.web',
      MDPopupStyles: 'mand-mobile-rn/dist/component/popup/index.web',
      MDSwiper: 'mand-mobile-rn/dist/component/swiper/index.web',
      MDWaterMark: 'mand-mobile-rn/dist/component/popup/index.web',
      MDSwitch: 'mand-mobile-rn/dist/component/switch/index.web',
      MDIcon: 'mand-mobile-rn/dist/component/icon/index.web',
      MDTag: 'mand-mobile-rn/dist/component/tag/index.web',
      MDTip: 'mand-mobile-rn/dist/component/tip/index.web',
      MDChart: 'mand-mobile-rn/dist/component/chart/index.web',
      MDStepper: 'mand-mobile-rn/dist/component/stepper/index.web',
      MDBoxShadow: 'mand-mobile-rn/dist/component/shadow/index.web',
      MDBorderShadow: 'mand-mobile-rn/dist/component/shadow/index.web',
    }),
  }

  config.module.rules.push({
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        // The 'react-native' preset is recommended to match React Native's packager
        presets: ['module:metro-react-native-babel-preset'],
        // Re-write paths to import only the modules needed by the app
        // plugins: ['react-native-web'],
      },
    },
  })

  config.module.rules.push({
    test: /\.md$/,
    loaders: ['markdown-loader'],
  })

  // config.module.rules.push({
  //   test: /\.stories\.js?$/,
  //   loaders: [require.resolve('@storybook/addon-storysource/loader')],
  //   enforce: 'pre',
  // })

  // config.module.rules.push({
  //   test: /\.ttf$/,
  //   loader: 'url-loader', // or directly file-loader
  //   include: [
  //     path.resolve(__dirname, '../node_modules/react-native-vector-icons'),
  //     path.resolve(__dirname, '../node_modules/mand-mobile-rn'),
  //     path.resolve(__dirname, '../../dist/assets/fonts'),
  //   ],
  // })

  // config.module.rules.push({
  //   test: /\.(svg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  //   loader: 'url-loader',
  //   include: [
  //     path.resolve(__dirname, '../../dist/assets/image'),
  //     path.resolve(__dirname, '../../dist/assets/gif'),
  //   ],
  // })

  config.node = {
    fs: 'empty',
    module: 'empty',
  }

  return config
}
