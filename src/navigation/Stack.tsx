import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import styled from "styled-components/native";
import Detail from "../screens/Detail";
import colors from "../../colors";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() !== "dark";

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? colors.black : "white",
        },
        headerTitleStyle: { color: isDark ? "white" : colors.black },
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerLeft: () => <></>,
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
