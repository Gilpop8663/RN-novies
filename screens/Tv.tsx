import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { MovieResponse, tvApi, TvResponse } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";
import { isNextPage } from "../util";

const Tv = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const {
    isLoading: onAiringLoading,
    data: onAiringData,
    isRefetching: onAiringRefetching,
    hasNextPage: onAirHasNext,
    fetchNextPage: onAirFetchNext,
  } = useInfiniteQuery<TvResponse>(["tv", "onAiringas"], tvApi.onAiring, {
    getNextPageParam: isNextPage,
  });

  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    isRefetching: topRatedRefetching,
    hasNextPage: topRatedHasNext,
    fetchNextPage: topRatedFetchNext,
  } = useInfiniteQuery<TvResponse>(["tv", "topRatedas"], tvApi.topRated, {
    getNextPageParam: isNextPage,
  });
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
    hasNextPage: tvTrendingHasNext,
    fetchNextPage: tvTrendingFetchNext,
  } = useInfiniteQuery<MovieResponse>(["tv", "trendingas"], tvApi.trending, {
    getNextPageParam: isNextPage,
  });
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
      <HList
        title="Trending TV"
        isNext={tvTrendingHasNext}
        isFetch={tvTrendingFetchNext}
        data={trendingData?.pages?.map((item) => item.results).flat()}
      ></HList>
      <HList
        isNext={onAirHasNext}
        isFetch={onAirFetchNext}
        title="Aring Today"
        data={onAiringData?.pages?.map((item) => item.results).flat()}
      ></HList>
      <HList
        isNext={topRatedHasNext}
        isFetch={topRatedFetchNext}
        title="Top Rated TV"
        data={topRatedData?.pages?.map((item) => item.results).flat()}
      ></HList>
    </ScrollView>
  );
};
export default Tv;
