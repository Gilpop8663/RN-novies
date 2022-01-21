import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Movie } from "../api";
import Poster from "./Poster";
import Vote from "./Vote";

const Title = styled.Text`
  color: white;
`;

const UpcomingWrapper = styled.View`
  flex-direction: row;
`;

const Column = styled.View`
  width: 80%;
  margin-left: 15px;
`;
const Overview = styled.Text`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  width: 80%;
`;

interface IVMedia {
  originalTitle: string;
  posterPath: string;
  voteAverage: number;
  overview: string;
  fullData: Movie;
}

const VMedia: React.FC<IVMedia> = ({
  originalTitle,
  posterPath,
  voteAverage,
  overview,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail", params: { ...fullData } });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <UpcomingWrapper style={{ paddingHorizontal: 30 }}>
        <Poster path={posterPath} />
        <Column>
          <Title style={{ marginBottom: 10 }}>
            {originalTitle.slice(0, 15)}
            {originalTitle.length > 15 ? "..." : null}
          </Title>
          <Overview>
            {overview.slice(0, 130)}
            {overview.length > 130 ? "..." : null}
          </Overview>
          <Vote voteAverage={voteAverage} />
        </Column>
      </UpcomingWrapper>
    </TouchableOpacity>
  );
};

export default VMedia;
