import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { movieApi, tvApi } from "../api";
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

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], movieApi.search, { enabled: false });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, { enabled: false });
  const onChangeText = (text: string) => {
    setQuery(text);
  };
  const onSubmit = async () => {
    if (query === "") {
      return;
    }

    await searchMovies();
    await searchTv();
  };
  return (
    <Container>
      <SearchBar
        returnKeyType="search"
        placeholder="Search For Movie or Tv Show"
        placeholderTextColor="gray"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader></Loader> : null}

      <HList title="Movie Results" data={moviesData?.results} />

      <HList title="TV Results" data={tvData?.results} />
    </Container>
  );
};
export default Search;
