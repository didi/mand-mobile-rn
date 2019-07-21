import React from 'react'
import AllIcon from '../../../../demo/icon/all.demo'
import SingIcon from '../../../../demo/icon/single.demo'
import ColorIconDemo from '../../../../demo/icon/color.demo'
import Card from '../../../components/card'
import Container from '../../../components/container'

export class IconScreen extends React.Component {
  static navigationOptions = {
    title: 'Icon',
  }

  render() {
    const svgXmlData =
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">\n<g id="icomoon-ignore">\n</g>\n<path fill="#f3f4f5" d="M512.010 1024c-282.788 0-512.010-229.222-512.010-511.99 0-282.788 229.222-512.010 512.010-512.010 282.767 0 511.99 229.222 511.99 512.010 0 282.767-229.222 511.99-511.99 511.99z"></path>\n<path fill="#666f83" d="M465.306 225.28h103.608l-18.647 350.382h-69.427l-15.534-350.382zM564.081 689.828c13.046 12.38 19.599 27.341 19.599 44.974 0 19.896-6.605 35.533-19.825 46.868-13.24 11.366-28.672 17.050-46.285 17.050-17.92 0-33.567-5.601-46.94-16.835-13.373-11.223-20.070-26.911-20.070-47.084 0-17.623 6.41-32.594 19.18-44.974 12.78-12.339 28.426-18.524 46.95-18.524 18.493 0 34.304 6.185 47.391 18.524z"></path>\n</svg>\n'
    return (
      <Container>
        <Card title="Base">
          <SingIcon name="scan" size={24} color="orange" />
        </Card>

        <Card title="Internal svg icon">
          <SingIcon name="success-color" svg size={24} />
          <SingIcon name="warn-color" svg size={24} />
        </Card>

        <Card title="Remote svg icon">
          <SingIcon
            source={{
              uri:
                'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg',
            }}
            svg
            size={52}
            name="Remote svg"
          />
        </Card>

        <Card title="External xml data svg icon">
          <SingIcon svgXmlData={svgXmlData} svg size={52} name="svg xml data" />
        </Card>

        <Card title="Color">
          <ColorIconDemo />
        </Card>

        <Card title="Mand mobile icons" height={400}>
          <AllIcon />
        </Card>
      </Container>
    )
  }
}

// <Card title='React native vector icons'>
//           <SingIcon type='FontAwesome' name='glass' color='#333' size={16} />
//         </Card>
