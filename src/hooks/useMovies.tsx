import APIClient, { FetchResponse } from "@/services/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import { Movie } from "../entities/Movie";
import { MovieQuery, useMovieQueryStore } from "@/stores/MovieQueryStore";

const useMovies = (query?: MovieQuery) => {
  const storeQuery = useMovieQueryStore((s) => s.movieQuery);
  const currentQuery = query || storeQuery;

  const apiClient = new APIClient<Movie>(
    currentQuery.searchText ? "search/movie" : "discover/movie"
  );

  return useInfiniteQuery<FetchResponse<Movie>, Error>({
    queryKey: ["movies", currentQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          language: "en-US",
          page: pageParam,
          "vote_count.gte": currentQuery.searchText
            ? undefined
            : currentQuery.sortBy == "vote_average.desc"
              ? 250
              : 10,
          watch_region: "US",
          with_genres: currentQuery.searchText
            ? undefined
            : currentQuery.genre?.id,
          sort_by: currentQuery.searchText ? undefined : currentQuery.sortBy,
          with_watch_providers: currentQuery.searchText
            ? undefined
            : currentQuery.provider?.provider_id,
          query: currentQuery.searchText || undefined,
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
    placeholderData: query ? (prev) => prev : undefined,
  });
};

export default useMovies;
