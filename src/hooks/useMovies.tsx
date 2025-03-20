import { MovieQuery } from "@/App";
import { useQuery } from "@tanstack/react-query";
import APIClient from "@/services/api-client";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const useMovies = (movieQuery: MovieQuery) => {
  const apiClient = new APIClient<Movie>(
    movieQuery.searchText ? "search/movie" : "discover/movie"
  );

  return useQuery({
    queryKey: ["movies", movieQuery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          language: "en-US",
          page: 1,
          "vote_count.gte": movieQuery.searchText ? undefined : 300,
          watch_region: "US",
          with_genres: movieQuery.searchText ? undefined : movieQuery.genre?.id,
          sort_by: movieQuery.searchText ? undefined : movieQuery.sortBy,
          with_watch_providers: movieQuery.searchText
            ? undefined
            : movieQuery.provider?.provider_id,
          query: movieQuery.searchText || undefined,
        },
      }),
  });
};

export default useMovies;
