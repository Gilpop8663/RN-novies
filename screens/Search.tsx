import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

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
  const onChangeText = (text) => {
    setQuery(text);
  };
  return (
    <Container>
      <SearchBar
        returnKeyType="search"
        placeholder="Search For Movie or Tv Show"
        placeholderTextColor="gray"
        onChangeText={onChangeText}
      />
    </Container>
  );
};
export default Search;
