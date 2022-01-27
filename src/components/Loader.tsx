import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = () => (
  <Wrapper>
    <ActivityIndicator size={"large"} color={"white"}></ActivityIndicator>
  </Wrapper>
);

export default Loader;
