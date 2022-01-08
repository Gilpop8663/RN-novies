import React, { useState } from "react";
import { View, Text, Dimensions, ActivityIndicator,StyleSheet } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Screen = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  color: ${(props) => props.theme.accentColor};
`;

const Poster = styled.View``
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const API_KEY = "8ada0ba81365b222c17dc83dc8b3e61d";

const Movies = () => {
  const [nowMovies, setNowMovies] = useState([]);
  const getNowMovie = async () => {
    const data = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json();
    console.log(data);
    setNowMovies(data);
  };
  const [loading, setLoading] = useState(true);
  useState(() => {
    getNowMovie();
    setLoading(false);
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator size={"large"} color={"white"}></ActivityIndicator>
    </Loader>
  ) : (
    <Container>
      <Swiper
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
        loop
        timeout={3.5}
        controlsEnabled={false}
      >
        {nowMovies.map(item=><Screen key={item.id}>
          <Poster style={StyleSheet.ab}></Poster>
        </Screen>)
      </Swiper>
    </Container>
  );
};
export default Movies;
