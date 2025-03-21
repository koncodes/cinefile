import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { Trailer } from "../entities/Trailer";

const useTrailers = (id: number | string) => {
  const apiClient = new APIClient<Trailer>(`/movie/${id}/videos`);

  return useQuery({
    queryKey: ["trailers", id],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });
};

export default useTrailers;
