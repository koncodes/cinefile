import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { Movie } from "../entities/Movie";

const useMovieExtended = (id: number | string) => {
  const apiClient = new APIClient<Movie>("/movie");

  return useQuery<Movie, Error>({
    queryKey: ["movie", id],
    queryFn: () =>
      apiClient.get(id, {
        params: {
          append_to_response:
            "credits,images,keywords,recommendations,videos,watch/providers",
        },
      }),
    staleTime: ms("24h"),
  });
};

export default useMovieExtended;
