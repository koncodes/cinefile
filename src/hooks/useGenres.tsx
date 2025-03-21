import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import genres from "../data/genres";

export interface Genre {
  id: number;
  name: string;
}

const useGenres = () => {
  const apiClient = new APIClient<Genre>("/genre/movie/list");

  return useQuery({
    queryKey: ["genres"],
    queryFn: () => apiClient.getAll({ params: { language: "en-US" } }),
    staleTime: ms("24h"),
    initialData: genres,
  });
};

export default useGenres;
