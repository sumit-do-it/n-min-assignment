import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "components/molecules/TabBar";
import Search from "components/templates/Search";
import Home from "components/templates/Home";

const Tabs = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen
        name="Cart"
        component={() => null}
        options={{ navigateTo: "Cart_Screen" }}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabNavigator;
