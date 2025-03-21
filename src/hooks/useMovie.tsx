import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: object[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object[];
  production_countries: object[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const useMovie = (id: number | string) => {
  const apiClient = new APIClient<Movie>("/movie");

  return useQuery<Movie, Error>({
    queryKey: ["movie", id],
    queryFn: () => apiClient.get(id),
    staleTime: ms("24h"),
  });
};

export default useMovie;
