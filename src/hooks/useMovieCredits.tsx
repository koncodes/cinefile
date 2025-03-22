import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

interface CreditPerson {
  id: number;
  name: string;
  profile_path: string | null;
  job?: string;
  character?: string;
  department?: string;
  credit_id: string;
}

type CreditType = "cast" | "crew" | "directors";

const useMovieCredits = (movieId: number | string, creditType: CreditType) => {
  const apiClient = new APIClient<{
    cast: CreditPerson[];
    crew: CreditPerson[];
  }>(`/movie/${movieId}/credits`);

  return useQuery({
    queryKey: [creditType, movieId],
    queryFn: async () => {
      const data = await apiClient.getAll();

      switch (creditType) {
        case "cast":
          return data.cast;
        case "crew":
          return data.crew;
        case "directors":
          return data.crew.filter(
            (person: CreditPerson) => person.job === "Director"
          );
        default:
          throw new Error(`Invalid credit type: ${creditType}`);
      }
    },
    staleTime: ms("24h"),
  });
};

export default useMovieCredits;
