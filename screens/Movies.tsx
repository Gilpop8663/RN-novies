import React, { useEffect, useState } from "react";
import { Dimensions, ActivityIndicator, useColorScheme } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";

import Slider from "../components/Slider";
import Poster from "../components/Poster";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  color: ${(props) => props.theme.accentColor};
`;

const Category = styled.ScrollView``;
const Wrapper = styled.View`
  align-items: center;
  padding-left: 30px;
`;
const Title = styled.Text``;
const Vote = styled.Text`
  color: rgba(0, 0, 0, 0.8);
  font-size: 12px;
  margin-top: 5;
`;
const UpcomingWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`;

const Column = styled.View`
  width: 80%;
  margin-left: 15px;
`;
const Overview = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
  width: 80%;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const API_KEY = "8ada0ba81365b222c17dc83dc8b3e61d";

const Movies = () => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowMovies, setNowMovies] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json();
    setUpcoming(results);
  };
  const getNowMovie = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json();
    //console.log(results);
    setNowMovies(results);
  };
  const getData = async () => {
    await Promise.all([getNowMovie(), getUpcoming(), getTrending()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator size={"large"} color={"white"}></ActivityIndicator>
    </Loader>
  ) : (
    <Container>
      <Swiper
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 4,
          marginBottom: 30,
        }}
        loop
        horizontal
        autoplay
        showsButtons={false}
        autoplayTimeout={3.5}
        showsPagination={false}
      >
        {nowMovies.map((item) => (
          <Slider
            id={item.id}
            backdropPath={item.backdrop_path}
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
            overview={item.overview}
          />
        ))}
      </Swiper>
      <Title style={{ marginLeft: 30, marginBottom: 10, fontSize: 18 }}>
        Trending Movies
      </Title>
      <Category
        horizontal
        contentContainerStyle={{
          paddingRight: 30,
          marginBottom: 30,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {trending.map((item) => (
          <Wrapper key={item.id} style={{}}>
            <Poster path={item.poster_path}></Poster>
            <Title>
              {item.original_title.slice(0, 10)}
              {item.original_title.length > 10 ? "..." : null}
            </Title>
            <Vote>
              {item.vote_average ? `⭐️ ${item.vote_average}/10` : null}{" "}
            </Vote>
          </Wrapper>
        ))}
      </Category>
      <Title style={{ marginLeft: 30, marginBottom: 10, fontSize: 18 }}>
        Upcoming Movies
      </Title>
      <Category contentContainerStyle={{ paddingHorizontal: 30 }}>
        {upcoming.map((item) => (
          <UpcomingWrapper key={item.id}>
            <Poster path={item.poster_path} />
            <Column>
              <Title style={{ marginBottom: 10 }}>
                {item.original_title.slice(0, 15)}
                {item.original_title.length > 15 ? "..." : null}
              </Title>
              <Overview>
                {item.overview.slice(0, 130)}
                {item.overview.length > 130 ? "..." : null}
              </Overview>
              <Vote>
                {item.vote_average ? `⭐️ ${item.vote_average}/10` : null}{" "}
              </Vote>
            </Column>
          </UpcomingWrapper>
        ))}
      </Category>
    </Container>
  );
};
export default Movies;
