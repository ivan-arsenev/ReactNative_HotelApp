import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import NotificationScreen from "../screens/NotificationScreen";
import UserScreen from "../screens/UserScreen";
import CartScreen from "../screens/CartScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-home${focused ? "" : "-outline"}`
          : "md-home"
      }
    />
  )
};

HomeStack.path = "";

const NotificationStack = createStackNavigator(
  {
    Links: NotificationScreen
  },
  config
);

NotificationStack.navigationOptions = {
  tabBarLabel: "Notification",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-notifications" : "md-notifications"}
    />
  )
};

NotificationStack.path = "";

const CartStack = createStackNavigator(
  {
    Cart: CartScreen
  },
  config
);

CartStack.navigationOptions = {
  tabBarLabel: "Cart",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
    />
  )
};

CartStack.path = "";

const UserStack = createStackNavigator(
  {
    User: UserScreen
  },
  config
);

UserStack.navigationOptions = {
  tabBarLabel: "User",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  )
};

UserStack.path = "";

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    NotificationStack,
    CartStack,
    UserStack
  },
  {
    tabBarOptions: {
      showLabel: false,

      style: {
        backgroundColor: "#040814",
        borderTopColor: "#040814"
      }
    }
  }
);

tabNavigator.path = "";

export default tabNavigator;
