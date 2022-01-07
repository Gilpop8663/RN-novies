import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const NativeStack = createNativeStackNavigator();

const screenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>go to two</Text>
  </TouchableOpacity>
);
const screenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>go to three</Text>
  </TouchableOpacity>
);
const screenThree = ({ navigation: { setOptions } }) => (
  <TouchableOpacity onPress={() => setOptions({ title: "Hello" })}>
    <Text>change Update</Text>
  </TouchableOpacity>
);

const Stack = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen name="One" component={screenOne} />
      <NativeStack.Screen name="Two" component={screenTwo} />
      <NativeStack.Screen name="Three" component={screenThree} />
    </NativeStack.Navigator>
  );
};

export default Stack;
