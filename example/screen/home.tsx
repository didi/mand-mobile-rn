import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';

import { Block } from '../components/block';
import { Category } from '../components/category';

import { default as basicItems } from './basic/_items.js';
import { default as businessItems } from './business/_items.js';
import { default as feedbackItems } from './feedback/_items.js';
import { default as formItems } from './form/_items.js';

export default function HomeScreen(props: any) {

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mand Mobile RN</Text>
      <Text style={styles.desc}>面向金融场景的移动端React Native组件库</Text>
      <Block name='Basic' ccname='基础' color='#5e83dd'>
        <Category navigation={props.navigation} items={basicItems}></Category>
      </Block>
      <Block name='Business' ccname='业务相关' color='#83d23a'>
        <Category navigation={props.navigation} items={businessItems}></Category>
      </Block>
      <Block name='Feedback' ccname='操作反馈' color='#ff7a2e'>
        <Category navigation={props.navigation} items={feedbackItems}></Category>
      </Block>
      <Block name='Form' ccname='表单相关' color='#ffc013'>
        <Category navigation={props.navigation} items={formItems}></Category>
      </Block>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 25,
  },
  title: {
    width: '100%',
    fontSize: 30,
    fontWeight: '400',
    color: '#666f83',
    marginVertical: 10,
  },
  desc: {
    width: '100%',
    fontSize: 13,
    fontWeight: '300',
    color: '#666f83',
    marginBottom: 15,
  },
});
