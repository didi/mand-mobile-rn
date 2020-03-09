import * as React from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { resultPage } from '../../_styles/themes/default.components';
import MDButton, { MDButtonType } from '../button/index';

export interface IMDResultPageButtonSet {
  type: MDButtonType | string;
  text: string;
  handler: () => void;
}

export interface IMDResultPageStyle {
  wrapper: ViewStyle;
  text: TextStyle;
  subtext: TextStyle;
  image: ImageStyle;
  buttonWrapper: ViewStyle;
}

export const MDResultPageStyles: IMDResultPageStyle = {
  wrapper: {
    alignItems: 'center',
  },
  text: {
    color: resultPage.titleColor,
    fontSize: resultPage.titleFontSize,
    marginVertical: 20,
  },
  subtext: {
    color: resultPage.describeColor,
    fontSize: resultPage.describeFontSize,
    marginVertical: 20,
  },
  image: {
    width: resultPage.imageSize,
    height: resultPage.imageSize,
    marginBottom: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
};

export type MDResultPageType = 'empty' | 'lost' | 'network';

const INFO = {
  empty: {
    img:
      'https://manhattan.didistatic.com/static/manhattan/mand-mobile/result-page/2.0/empty.png',
    text: '暂无信息',
  },
  lost: {
    img:
      'https://manhattan.didistatic.com/static/manhattan/mand-mobile/result-page/2.0/lost.png',
    text: '您要访问的页面已丢失',
  },
  network: {
    img:
      'https://manhattan.didistatic.com/static/manhattan/mand-mobile/result-page/2.0/network.png',
    text: '网络连接异常',
  },
};

const styles = StyleSheet.create<IMDResultPageStyle>(MDResultPageStyles);
const defaultProps = {
  styles: styles as IMDResultPageStyle,
  type: 'empty',
};

export interface IMDResultPageProps {
  styles?: IMDResultPageStyle;
  type?: MDResultPageType;
  imgUrl?: string;
  text?: string;
  subtext?: string;
  buttons?: IMDResultPageButtonSet | IMDResultPageButtonSet[];
}

export default class MDResultPage extends React.Component<IMDResultPageProps> {
  public static defaultProps = defaultProps;

  constructor (props: IMDResultPageProps) {
    super(props);
  }

  public render () {
    let { imgUrl, text } = this.props;
    const { type, subtext, buttons } = this.props;
    if (type) {
      const info = INFO[type];
      if (info) {
        text = text ? text : info.text;
        imgUrl = imgUrl ? imgUrl : info.img;
      }
    }

    const buttonComponent = (
      buttonsParam?: IMDResultPageButtonSet | IMDResultPageButtonSet[]
    ) => {
      if (buttonsParam) {
        if (Array.isArray(buttonsParam)) {
          const buttonsArr = [];
          for (let i = 0, len = buttonsParam.length; i < len; i++) {
            const item = buttonsParam[i];
            if (!item || !item.text) {
              continue;
            }
            buttonsArr.push(
              <MDButton
                key={i}
                type={item.type as MDButtonType}
                size={'small'}
                plain={true}
                onPress={item.handler}
                style={{ marginHorizontal: 10 }}
              >
                {item.text}
              </MDButton>
            );
          }

          return <View style={styles.buttonWrapper}>{buttonsArr}</View>;
        }
        return (
          <MDButton
            plain={true}
            type={buttonsParam.type as MDButtonType}
            size={'small'}
            onPress={buttonsParam.handler}
          >
            {buttonsParam.text}
          </MDButton>
        );
      }
    };

    return (
      <View style={styles.wrapper}>
        {imgUrl ? (
          <Image style={styles.image} source={{ uri: imgUrl }} />
        ) : null}
        {text ? <Text style={styles.text}>{text}</Text> : null}
        {subtext ? (
          <Text style={[styles.subtext, text ? { marginTop: 0 } : null]}>
            {subtext}
          </Text>
        ) : null}
        {buttonComponent(buttons)}
      </View>
    );
  }
}
