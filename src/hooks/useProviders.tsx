import providers from "@/data/providers";
import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { Provider } from "../entities/Provider";

const useProviders = () => {
  const apiClient = new APIClient<Provider>("/watch/providers/movie");

  return useQuery({
    queryKey: ["providers"],
    queryFn: () =>
      apiClient.getAll({ params: { language: "en-US", watch_region: "US" } }),
    staleTime: ms("24h"),
    initialData: providers,
  });
};

export default useProviders;
