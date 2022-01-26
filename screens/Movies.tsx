import React, { useEffect, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";

import Slider from "../components/Slider";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { Movie, movieApi, MovieResponse } from "../api";
import Loader from "../components/Loader";
import { isNextPage, keyExtractor, loadMore } from "../util";

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const VSeparator = styled.View`
  width: 20px;
`;
const HSeparator = styled.View`
  height: 20px;
`;
const movieKeyExtractor = (item: Movie) => item.id + "";

const Movies = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(["movies", "nowPlaying"], movieApi.getNowPlaying);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    hasNextPage: trendingHasNext,
    fetchNextPage: trendingFetchNext,
  } = useInfiniteQuery<MovieResponse>(
    ["movies", "trending"],
    movieApi.getTrending,
    {
      getNextPageParam: isNextPage,
    }
  );
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage: upcomingHasNext,
    fetchNextPage: upcomingFetchNext,
  } = useInfiniteQuery<MovieResponse>(
    ["movies", "upcoming"],
    movieApi.getUpcoming,
    {
      getNextPageParam: isNextPage,
    }
  );
  //console.log(trendingData.pageParams);
  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  return loading ? (
    <Loader></Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
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
            {nowPlayingData.results.map((item: Movie) => (
              <Slider
                key={item.id}
                backdropPath={item.backdrop_path}
                posterPath={item.poster_path}
                originalTitle={item.original_title}
                voteAverage={item.vote_average}
                overview={item.overview}
                fullData={item}
              />
            ))}
          </Swiper>
          <Title style={{ marginLeft: 30, marginBottom: 10, fontSize: 18 }}>
            Trending Movies
          </Title>
          <FlatList
            onEndReached={() => loadMore(trendingHasNext, trendingFetchNext)}
            horizontal
            data={trendingData?.pages
              ?.map((item: MovieResponse) => item.results)
              .flat()}
            keyExtractor={keyExtractor}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 30 }}
            ItemSeparatorComponent={VSeparator}
            renderItem={({ item }) => (
              <HMedia
                voteAverage={item.vote_average}
                originalTitle={item.original_title}
                posterPath={item.poster_path}
                fullData={item}
              />
            )}
          ></FlatList>

          <Title style={{ marginLeft: 30, marginBottom: 10, fontSize: 18 }}>
            Upcoming Movies
          </Title>
        </>
      }
      onEndReached={() => loadMore(upcomingHasNext, upcomingFetchNext)}
      data={upcomingData.pages
        .map((item: MovieResponse) => item.results)
        .flat()}
      ItemSeparatorComponent={HSeparator}
      contentContainerStyle={{}}
      showsHorizontalScrollIndicator={false}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => (
        <VMedia
          key={item.id}
          overview={item.overview}
          originalTitle={item.original_title}
          voteAverage={item.vote_average}
          posterPath={item.poster_path}
          fullData={item}
        ></VMedia>
      )}
    ></FlatList>
  );
};
export default Movies;
