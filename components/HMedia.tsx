import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Movie } from "../api";
import Poster from "./Poster";
import Vote from "./Vote";

const Wrapper = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  color: white;
`;

interface IHMedia {
  originalTitle: string;
  posterPath: string;
  voteAverage: number;
  fullData: Movie;
}

const HMedia: React.FC<IHMedia> = ({
  originalTitle,
  posterPath,
  voteAverage,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail", params: { ...fullData } });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Wrapper style={{}}>
        <Poster path={posterPath}></Poster>
        <Title>
          {originalTitle.slice(0, 10)}
          {originalTitle.length > 10 ? `...` : null}
        </Title>
        <Vote voteAverage={voteAverage} />
      </Wrapper>
    </TouchableOpacity>
  );
};

export default HMedia;
