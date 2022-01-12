import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { MovieResponse, tvApi, TvResponse } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Tv = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const {
    isLoading: onAiringLoading,
    data: onAiringData,
    isRefetching: onAiringRefetching,
  } = useQuery<TvResponse>(["tv", "onAiringas"], tvApi.onAiring);

  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    isRefetching: topRatedRefetching,
  } = useQuery<TvResponse>(["tv", "topRatedas"], tvApi.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery<MovieResponse>(["tv", "trendingas"], tvApi.trending);
  const loading = onAiringLoading || trendingLoading || topRatedLoading;
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
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
