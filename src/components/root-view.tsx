import * as React from 'react';
import { AppRegistry, ComponentProvider, StyleSheet } from 'react-native';

let rootView: React.Component<any, any>;
const originRegister = AppRegistry.registerComponent;

export default class RootView extends React.Component<any, any> {
  constructor (props: any) {
    super(props);
    rootView = this;
    this.state = {
      eles: [],
    };
  }

  public render () {
    return <React.Fragment>{this.state.eles}</React.Fragment>;
  }

  public static add = (ele: any) => {
    let settup = false;
    const { eles } = rootView.state;

    for (const item of eles) {
      if (item.key === ele.key) {
        settup = true;
      }
    }
    if (settup) {
      return;
    }

    if (ele && React.isValidElement(ele)) {
      eles.push(ele);
      rootView.setState({ eles });
    } else {
      console.error('[RootView]: param of set must be valid react element!');
    }
  }

  public static remove = (guid: string) => {
    const { eles } = rootView.state;
    if (!guid) {
      return console.warn('[RootView]: remove element must be specified ID!');
    }
    const newEles = eles.filter((ele: any) => {
      return ele.key !== guid;
    });
    rootView.setState({ eles: newEles });
  }

  public static removeAll = () => {
    rootView.setState({ eles: [] });
  }
}

const wrapWithRoot = (OriginApp: React.ComponentType) => {
  class App extends React.Component<any, any> {
    public render () {
      return (
        <React.Fragment>
          <OriginApp {...this.props} />
          <RootView />
        </React.Fragment>
      );
    }
  }
  return App;
};

AppRegistry.registerComponent = (
  appKey: string,
  getComponentFunc: ComponentProvider
) => {
  const OriginAppComponent = getComponentFunc();
  return originRegister(appKey, () => wrapWithRoot(OriginAppComponent));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  rootView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
