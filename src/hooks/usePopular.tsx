import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { Movie } from "../entities/Movie";

const usePopular = () => {
  const apiClient = new APIClient<Movie>("/movie/popular");

  return useQuery({
    queryKey: ["popular"],
    queryFn: () =>
      apiClient.getAll({ params: { language: "en-US", watch_region: "US" } }),
    staleTime: ms("24h"),
  });
};

export default usePopular;
