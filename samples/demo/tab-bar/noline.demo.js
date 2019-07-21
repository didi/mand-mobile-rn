import * as React from "react";
import { View, Text } from "react-native";
import { MDTabBar } from "mand-mobile-rn";
import styles from "./styles";

export default class NolineTabBarDemo extends React.Component {
  render() {
    const items = [
      { name: 0, label: "标签1" },
      { name: 1, label: "标签2" },
      { name: 2, label: "标签3" }
    ];
    return (
      <View>
        <Text style={styles.title}>无下划线</Text>
        <MDTabBar current={0} items={items} />
      </View>
    );
  }
}
