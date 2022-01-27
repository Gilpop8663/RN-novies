import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Movie, MovieResponse, Tv, TvResponse } from "../api";
import { keyExtractor, loadMore } from "../utils/util";
import HMedia from "./HMedia";

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

interface IHList {
  title: string;
  data: Movie | Tv | MovieResponse | TvResponse;
  isNext?: boolean;
  isFetch: () => {};
}

const HList: React.FC<IHList> = ({ title, data, isNext, isFetch }) => {
  const hasNext = isNext;
  const fetchNext = isFetch;
  return (
    <ListContainer>
      <Title style={{ marginLeft: 30, marginVertical: 20, fontSize: 18 }}>
        {title}
      </Title>
      <FlatList
        horizontal
        data={data}
        onEndReachedThreshold={1}
        onEndReached={() => loadMore(hasNext, fetchNext)}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        ItemSeparatorComponent={VSeparator}
        renderItem={({ item }) => (
          <HMedia
            voteAverage={item.vote_average}
            originalTitle={item.original_title ? item.title : item.name}
            posterPath={item.poster_path}
            fullData={item}
          />
        )}
      ></FlatList>
    </ListContainer>
  );
};

export default HList;
