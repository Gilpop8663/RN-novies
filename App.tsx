import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import { useState } from "react";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./src/navigation/Tabs";
import { ThemeProvider } from "styled-components/native";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { darkTheme, lightTheme } from "./themes";
import Stack from "./src/navigation/Stack";
import Root from "./src/navigation/Root";
import colors from "./colors";

const queryClient = new QueryClient();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([
      require("./src/assets/fish.png"),
      "https://reactnative.dev/img/oss_logo.png",
    ]);
    await Promise.all([...fonts, ...images]);
  };
  const onFinish = () => {
    setReady(true);
  };
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <NavigationContainer>
          <Root />
          <StatusBar backgroundColor={colors.black} style="light" />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
