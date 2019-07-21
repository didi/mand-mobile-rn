import React from 'react'
import Container from '../../../components/container'
import Card from '../../../components/card'
import SingelImagePickerDemo from '../../../../demo/image-picker/single.demo'
import MutilImagePickerDemo from '../../../../demo/image-picker/multi.demo'
import MutilAndCameraImagePickerDemo from '../../../../demo/image-picker/multi-and-camera.demo'
import CropSquareImagePickerDemo from '../../../../demo/image-picker/crop-square.demo'
import CameraImagePickerDemo from '../../../../demo/image-picker/camera.demo'
export class ImagePickerScreen extends React.Component {
  static navigationOptions = {
    title: 'ImagePicker',
  }

  render() {
    return (
      <Container>
        <Card title="单选">
          <SingelImagePickerDemo />
        </Card>
        <Card title="多选">
          <MutilImagePickerDemo />
        </Card>
        <Card title="多选带拍照">
          <MutilAndCameraImagePickerDemo />
        </Card>
        <Card title="单独拍照">
          <CameraImagePickerDemo />
        </Card>
        <Card title="裁剪方形">
          <CropSquareImagePickerDemo />
        </Card>
      </Container>
    )
  }
}
