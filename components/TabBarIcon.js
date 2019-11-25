import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Link1 from "../assets/Link1.svg";
import Link2 from "../assets/Link2.svg";
import Link3 from "../assets/Link3.svg";
import Link4 from "../assets/Link4.svg";
import Colors from "../constants/Colors";
import { View } from "react-native";

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
