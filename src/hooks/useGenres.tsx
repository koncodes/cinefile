import { useQuery } from "@tanstack/react-query";
import APIClient from "@/services/api-client";
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
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    initialData: genres,
  });
};

export default useGenres;
