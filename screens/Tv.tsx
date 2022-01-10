import React from "react";
import { FlatList, ScrollView } from "react-native";
import { useQuery } from "react-query";
import { movieApi, MovieResponse, tvApi, TvResponse } from "../api";
import HMedia from "../components/HMedia";
import Loader from "../components/Loader";

const Tv = () => {
  const {
    isLoading: onAiringLoading,
    data: onAiringData,
    isRefetching: onAiringRefetching,
  } = useQuery<TvResponse>(["tv", "onAiring"], tvApi.onAiring);

  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    isRefetching: topRatedRefetching,
  } = useQuery<TvResponse>(["tv", "topRated"], tvApi.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery<MovieResponse>(["movies", "trending"], movieApi.getTrending);
  const loading = onAiringLoading || trendingLoading || topRatedLoading;
  console.log(topRatedLoading);
  //console.log(loading ? null : topRatedData);
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <FlatList
      data={topRatedData?.results}
      horizontal
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <HMedia
          originalTitle={item.original_name}
          posterPath={item.poster_path}
          voteAverage={item.vote_average}
        ></HMedia>
      )}
    ></FlatList>
  );
};
export default Tv;
