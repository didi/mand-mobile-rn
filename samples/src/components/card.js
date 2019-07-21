import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

export default class Card extends React.Component {

  render() {
    return (
      <View style={{height: this.props.height}}>
        <Text style={styles.title}>{this.props.title}</Text>
        <ScrollView alwaysBounceVertical={true} contentContainerStyle={[styles.container, this.props.style]}>
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 16,
  },
  container: {
    marginVertical: 10,
    // bordeRadius: 4,
    shadowColor: 'gray',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
});