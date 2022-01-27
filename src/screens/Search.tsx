import React, { useState } from "react";
import { Text } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { movieApi, MovieResponse, tvApi, TvResponse } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  width: 90%;
  margin: 10px auto;
  background-color: white;
  padding: 15px 10px;
  border-radius: 15px;
`;
const Wrapper = styled.View`
  width: 90%;
  margin: 10px auto;
`;
const NoPageTitle = styled.Text`
  margin-bottom: 15px;
  color: white;
  font-weight: 600;
  font-size: 18px;
`;

const NoPageMessage = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 14px;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const onChangeText = (text: string) => {
    setIsSubmit(false);
    setQuery(text);
  };
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery<MovieResponse>(["searchMoviess", query], movieApi.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery<TvResponse>(["searchTv", query], tvApi.search, {
    enabled: false,
  });
  const onSubmit = async () => {
    if (query === "") {
      return;
    }
    setIsSubmit(true);
    await searchMovies();
    await searchTv();
  };

  return (
    <Container>
      <SearchBar
        style={{ marginTop: 20 }}
        returnKeyType="search"
        placeholder="시리즈, 영화의 제목을 입력해주세요"
        placeholderTextColor="gray"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader></Loader> : null}

      {moviesData?.total_pages !== 0 ? (
        <HList
          title={isSubmit ? `영화 ${query} 검색 결과` : null}
          data={moviesData?.results}
        />
      ) : (
        <Wrapper>
          <NoPageTitle>
            {isSubmit ? `영화 ${query} 검색 결과` : null}
          </NoPageTitle>
          <NoPageMessage>검색하신 결과가 없습니다</NoPageMessage>
        </Wrapper>
      )}

      {tvData?.total_pages !== 0 ? (
        <HList
          title={isSubmit ? `시리즈 ${query} 검색 결과` : null}
          data={tvData?.results}
        />
      ) : (
        <Wrapper>
          <NoPageTitle>
            {isSubmit ? `시리즈 ${query} 검색 결과` : null}
          </NoPageTitle>
          <NoPageMessage>검색하신 결과가 없습니다</NoPageMessage>
        </Wrapper>
      )}
    </Container>
  );
};
export default Search;
