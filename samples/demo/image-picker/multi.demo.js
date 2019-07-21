import * as React from 'react'
import ImageBox from './image-box.demo'

export default class MutilImagePickerDemo extends React.Component {
  render() {
    return (
      <ImageBox
        options={{
          imageCount: 6,
        }}
      />
    )
  }
}
