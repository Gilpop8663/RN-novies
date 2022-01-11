import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { MovieResponse, tvApi, TvResponse } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Tv = () => {
  const queryClient = useQueryClient();
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
  } = useQuery<MovieResponse>(["tv", "trending"], tvApi.trending);
  const loading = onAiringLoading || trendingLoading || topRatedLoading;
  const refreshing =
    onAiringRefetching || topRatedRefetching || trendingRefetching;
  const onRefresh = async () => {
    queryClient.refetchQueries(["tv"]);
  };
  //console.log(loading ? null : topRatedData);
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        ></RefreshControl>
      }
    >
      <HList title="Trending TV" data={trendingData?.results}></HList>
      <HList title="Aring Today" data={onAiringData?.results}></HList>
      <HList title="Top Rated TV" data={topRatedData?.results}></HList>
    </ScrollView>
  );
};
export default Tv;
