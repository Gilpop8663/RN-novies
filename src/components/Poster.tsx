import styled from "styled-components/native";
import { makeUriImage } from "../utils/util";

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

interface IPoster {
  path: string;
}

const Poster: React.FC<IPoster> = ({ path }) => {
  return <Image source={{ uri: makeUriImage(path) }} />;
};

export default Poster;
