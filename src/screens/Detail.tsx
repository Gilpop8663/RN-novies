import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  StyleSheet,
  Share,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import Poster from "../components/Poster";
import { Movie, movieApi, Tv, tvApi } from "../api";
import styled from "styled-components/native";
import { makeUriImage } from "../utils/util";
import colors from "../../colors";
import { useQuery } from "react-query";
import { Ionicons } from "@expo/vector-icons";
import Loader from "../components/Loader";

type RootStackParamList = {
  Detail: Movie | Tv;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  padding: 0px 20px;
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
`;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Background = styled.Image``;

const Title = styled.Text`
  color: white;
  font-size: 36px;
  margin-left: 15px;
  align-self: flex-end;
  font-weight: 500;
`;

const OverView = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
`;

const DataContainer = styled.View`
  padding: 0 20px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const BtnText = styled.Text`
  margin-top: 5px;
  color: white;
  margin-left: 10px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 5px;
`;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? movieApi.detail : tvApi.detail
  );
  const openYTLink = async (videoID: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoID}`;
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}`
      : data.homepage;
    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\n Check it out : ${homepage} `,
        title: isMovie ? params.title : params.name,
      });
    } else {
      await Share.share({
        url: homepage,
        title: isMovie ? params.title : params.name,
      });
    }
  };

  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color="white" size={24} />
    </TouchableOpacity>
  );

  useEffect(() => {
    setOptions({
      title: isMovie ? "Movie" : "TV Show",
    });
  }, []);
  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);
  //console.log(data);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeUriImage(params.backdrop_path || "") }}
        />
        <LinearGradient
          colors={["transparent", colors.black]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>{isMovie ? params.title : params.name}</Title>
        </Column>
      </Header>
      <DataContainer>
        <OverView>{params?.overview || ""}</OverView>

        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((item) =>
          item.site === "YouTube" ? (
            <VideoBtn key={item.key} onPress={() => openYTLink(item.key)}>
              <Ionicons name="logo-youtube" color="white" size={24} />
              <BtnText>{item.name}</BtnText>
            </VideoBtn>
          ) : null
        )}
      </DataContainer>
    </Container>
  );
};

export default Detail;
