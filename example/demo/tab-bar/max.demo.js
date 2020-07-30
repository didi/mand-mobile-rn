import * as React from "react";
import { View, Text } from "react-native";
import { MDTabBar } from "mand-mobile-rn";
import styles from "./styles";

export default class MaxTabBarDemo extends React.Component {
  render() {
    const items = [
      { name: 0, label: "标签1" },
      { name: 1, label: "标签2" },
      { name: 2, label: "标签3" },
      { name: 3, label: "标签4" },
      { name: 4, label: "标签5" }
    ];
    return (
      <View>
        <Text style={styles.title}>首屏数量</Text>
        <MDTabBar current={0} items={items} hasInk />
      </View>
    );
  }
}
