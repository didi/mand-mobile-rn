import * as React from 'react'
import {
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native'
import { MDIcon } from '../../../src'
import { MDImagePicker, DefaultImagePickerOptions } from '../../../src'

const width = Dimensions.get('window').width

export default class ImageBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageList: [],
    }
    this.onPressButton = this.onPressButton.bind(this)
    this.onPressDelete = this.onPressDelete.bind(this)
  }
  render() {
    const { imageList } = this.state
    console.info(imageList)
    return (
      <View style={styles.container}>
        <Button title={'开始'} onPress={() => this.onPressButton()} />
        <View style={styles.imageBox}>
          {imageList.map((image, index) => {
            return this.renderImage(image.uri, index)
          })}
        </View>
      </View>
    )
  }
  renderImage(uri, index) {
    return (
      <TouchableOpacity
        key={uri}
        style={styles.imageContainer}
        onPress={() => {
          const imageList = this.state.imageList.map((image) => image.uri)
          MDImagePicker.previewImageList(imageList, index, false)
        }}
      >
        <Image style={styles.image} resizeMode="cover" source={{ uri }} />
        <TouchableOpacity
          style={styles.delete}
          onPress={() => {
            this.onPressDelete(index)
          }}
        >
          <MDIcon name={'wrong'} color="black" size={16} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
  onPressButton() {
    const options = {
      ...DefaultImagePickerOptions,
      ...this.props.options,
    }
    if (this.props.type === 'camera') {
      MDImagePicker.asyncOpenCamera(options)
        .then((imageList) =>
          this.setState({
            imageList,
          }),
        )
        .catch((err) => console.info(err))
    } else {
      MDImagePicker.showImagePicker(
        options,
        (imageList) => {
          console.info(imageList)
          this.setState({
            imageList,
          })
        },
        (err) => {
          console.info(err)
        },
      )
    }
  }

  onPressDelete(index) {
    this.setState((prevState, props) => ({
      imageList: this.remove(prevState.imageList, index),
    }))
    MDImagePicker.removeImage(index)
  }

  remove(array, index) {
    let arr = array.slice()
    arr.splice(index, 1)
    return arr
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  imageBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  imageContainer: {
    width: width * 0.25,
    height: width * 0.25,
    marginTop: 5,
    marginRight: 5,
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
  },
  delete: {
    marginRight: 4,
    marginTop: 4,
    position: 'absolute',
    right: 0,
  },
})
