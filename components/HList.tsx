import { FlatList } from "react-native";
import styled from "styled-components/native";
import HMedia from "./HMedia";

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const HList = ({ title, data }) => (
  <ListContainer>
    <Title style={{ marginLeft: 30, marginBottom: 10, fontSize: 18 }}>
      {title}
    </Title>
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id + ""}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      ItemSeparatorComponent={VSeparator}
      renderItem={({ item }) => (
        <HMedia
          voteAverage={item.vote_average}
          originalTitle={item.original_title ?? item.original_name}
          posterPath={item.poster_path}
          fullData={item}
        />
      )}
    ></FlatList>
  </ListContainer>
);

export default HList;
