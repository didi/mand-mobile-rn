import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { MDImageViewer } from 'mand-mobile-rn'

const width = Dimensions.get('window').width
const imgs = [
  'https://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
  'https://manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
  'https://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/6ee5a0ba9340ca452cbc827902e76be0',
  'https://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/d751dd4487e265de3b8587f504eee2c3',
  'https://wx1.sinaimg.cn/mw690/a933f2daly1fz1c1qfldsj20u04iu1ky.jpg',
  'https://ww1.sinaimg.cn/bmiddle/784fda03gy1fz5leoaykwg20b0054e83.gif',
]

export default class ImageViewerDemo extends React.Component {
  render() {
    return <View style={styles.imageBox}>{this.renderImages()}</View>
  }

  renderImages() {
    return imgs.map((url, index) => (
      <TouchableOpacity
        key={url}
        style={styles.touchableOpacity}
        onPress={() => MDImageViewer.show(imgs, index, true)}
      >
        <Image style={styles.image} resizeMode="cover" source={{ uri: url }} />
      </TouchableOpacity>
    ))
  }
}

const styles = StyleSheet.create({
  imageBox: {
    display: 'flex',
    width: '100%',
    height: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  touchableOpacity: {
    width: '22%',
    height: '22%',
    paddingBottom: '2%',
    paddingTop: '2%',
    paddingLeft: '2%',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
})
