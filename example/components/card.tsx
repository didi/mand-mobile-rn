import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

const Card = (props: any) => {
  const { height, title, style, children } = props;
  return (
    <View style={{height: height}}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView alwaysBounceVertical={true} contentContainerStyle={[styles.container, style]}>
        {children}
      </ScrollView>
    </View>
  );
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

export default Card;
