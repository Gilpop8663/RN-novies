import styled from "styled-components/native";
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
}

const HMedia: React.FC<IHMedia> = ({
  originalTitle,
  posterPath,
  voteAverage,
}) => {
  return (
    <Wrapper style={{}}>
      <Poster path={posterPath}></Poster>
      <Title>
        {originalTitle.slice(0, 10)}
        {originalTitle.length > 10 ? `...` : null}
      </Title>
      <Vote voteAverage={voteAverage} />
    </Wrapper>
  );
};

export default HMedia;
