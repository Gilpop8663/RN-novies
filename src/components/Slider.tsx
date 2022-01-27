import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import styled from "styled-components/native";
import { Movie } from "../api";
import { makeUriImage } from "../utils/util";
import Poster from "./Poster";

const Screen = styled.View`
  flex: 1;
`;

const BgImg = styled.Image``;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 0 auto;
  height: 100%;
  width: 90%;
  align-items: center;
`;

const Column = styled.View`
  width: 60%;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
`;

const Description = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 10px;
`;

const Vote = styled(Description)`
  font-size: 12px;
`;

interface ISliderProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
  fullData: Movie;
}

const Slider: React.FC<ISliderProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail", params: { ...fullData } });
  };
  const isDark = useColorScheme() !== "dark";
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <Screen>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeUriImage(backdropPath) }}
        ></BgImg>
        <BlurView
          style={StyleSheet.absoluteFill}
          intensity={90}
          tint={isDark ? "dark" : "light"}
        >
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title>{originalTitle}</Title>
              <Vote>{voteAverage > 0 ? `⭐️${voteAverage}/10` : null}</Vote>
              <Description>{overview.slice(0, 100)}...</Description>
            </Column>
          </Wrapper>
        </BlurView>
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default Slider;
