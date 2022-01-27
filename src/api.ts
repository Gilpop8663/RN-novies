const API_KEY = "8ada0ba81365b222c17dc83dc8b3e61d";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Tv {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

interface BaseResponse {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export interface TvResponse extends BaseResponse {
  results: Tv[];
}

export const movieApi = {
  getTrending: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko&page=${
        pageParam ? pageParam : 1
      }`
    ).then((res) => res.json()),
  getUpcoming: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&page=${
        pageParam ? pageParam : 1
      }`
    ).then((res) => res.json()),
  getNowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1`
    ).then((res) => res.json()),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko&append_to_response=videos&images`
    ).then((res) => res.json());
  },
  spiderSearch: () =>
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=8ada0ba81365b222c17dc83dc8b3e61d&language=ko&query=Spider`
    ).then((res) => res.json()),
};

export const tvApi = {
  onAiring: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko&page=${
        pageParam ? pageParam : 1
      }`
    ).then((res) => res.json()),
  trending: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=ko&page=${
        pageParam ? pageParam : 1
      }`
    ).then((res) => res.json()),
  topRated: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko&page=${
        pageParam ? pageParam : 1
      }`
    ).then((res) => res.json()),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;

    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=ko&append_to_response=videos&images`
    ).then((res) => res.json());
  },
  spiderSearch: () =>
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=8ada0ba81365b222c17dc83dc8b3e61d&language=ko&query=Spider`
    ).then((res) => res.json()),
};
