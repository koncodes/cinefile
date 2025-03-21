import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { Movie } from "../entities/Movie";

const useMovie = (id: number | string) => {
  const apiClient = new APIClient<Movie>("/movie");

  return useQuery<Movie, Error>({
    queryKey: ["movie", id],
    queryFn: () => apiClient.get(id),
    staleTime: ms("24h"),
  });
};

export default useMovie;
