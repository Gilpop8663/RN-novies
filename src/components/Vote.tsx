import styled from "styled-components/native";

const VoteText = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  margin-top: 5px;
`;

interface IVote {
  voteAverage: number;
}

const Vote: React.FC<IVote> = ({ voteAverage }) => {
  return (
    <VoteText>{voteAverage ? `⭐️ ${voteAverage}/10` : "Coming Soon"}</VoteText>
  );
};

export default Vote;
