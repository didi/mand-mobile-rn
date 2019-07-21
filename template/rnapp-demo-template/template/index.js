import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { MD{{ccname}} } from 'mand-mobile-rn';

export class {{ccname}}Screen extends React.Component {
  static navigationOptions = {
    title: '{{ccname}}',
  };

  render() {
    return (
      <View style={styles.container}>
        <MD{{ccname}}>{{ccname}}</MD{{ccname}}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});