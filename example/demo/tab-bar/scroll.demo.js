import * as React from "react";
import { View, Text } from "react-native";
import { MDTabBar } from "../../../src";
import styles from "./styles";

export default class ScrollTabBarDemo extends React.Component {
  render() {
    const items = [
      { name: 0, label: "红包" },
      { name: 1, label: "精选" },
      { name: 2, label: "全部" },
      { name: 3, label: "满减券" },
      { name: 4, label: "立减券" },
      { name: 5, label: "免息券" },
      { name: 6, label: "校园专享" },
      { name: 7, label: "夜间优惠" }
    ];
    return (
      <View>
        <Text style={styles.title}>滚动</Text>
        <MDTabBar current={0} items={items} hasInk />
      </View>
    );
  }
}
