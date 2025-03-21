import APIClient, { FetchResponse } from "@/services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import { Movie } from "../entities/Movie";
import { useMovieQueryStore } from "@/store";

const useMovies = () => {
  const movieQuery = useMovieQueryStore((s) => s.movieQuery);

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
    staleTime: ms("24h"),
  });
};

export default useMovies;
