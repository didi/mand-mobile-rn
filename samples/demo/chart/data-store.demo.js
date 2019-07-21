import { Dimensions } from "react-native";
export const width = Dimensions.get("window").width - 40; //40 is card & container component paddings
export const height = Math.round((width * 2) / 3);
export const labels = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
