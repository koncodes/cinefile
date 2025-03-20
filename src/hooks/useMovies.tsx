import { MovieQuery } from "@/App";
import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "@/services/api-client";

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

  return useInfiniteQuery<FetchResponse<Movie>, Error>({
    queryKey: ["movies", movieQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          language: "en-US",
          page: pageParam,
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
    initialPageParam: 1, 
    getNextPageParam: (lastPage, allPages) => {
      if ((lastPage.page ?? 0) < (lastPage.total_pages ?? 0)) {
        return (lastPage.page ?? 0) + 1; 
      }
      return undefined; 
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};

export default useMovies;