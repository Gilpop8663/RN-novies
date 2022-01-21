import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet } from "react-native";
import Poster from "../components/Poster";
import { Movie, Tv } from "../api";
import styled from "styled-components/native";
import { makeUriImage } from "../util";
import colors from "../colors";

type RootStackParamList = {
  Detail: Movie | Tv;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  padding: 0px 20px;
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
`;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Background = styled.Image``;

const Title = styled.Text`
  color: white;
  font-size: 36px;
  margin-left: 15px;
  align-self: flex-end;
  font-weight: 500;
`;

const OverView = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  padding: 0 20px;
`;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
    });
  }, []);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeUriImage(params.backdrop_path || "") }}
        />
        <LinearGradient
          colors={["transparent", colors.black]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <OverView>{params.overview}</OverView>
    </Container>
  );
};

export default Detail;
