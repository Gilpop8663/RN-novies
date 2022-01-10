import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() !== "dark";
  console.log(isDark);
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? colors.black : "white",
      }}
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: isDark ? colors.black : "white",
        },
        tabBarActiveTintColor: isDark ? colors.yellow : colors.black,
        tabBarInactiveTintColor: isDark ? colors.lowGray : colors.highGray,
        headerStyle: { backgroundColor: isDark ? colors.black : "white" },
        headerTitleStyle: { color: isDark ? "white" : colors.black },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "film" : "film-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "tv" : "tv-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
