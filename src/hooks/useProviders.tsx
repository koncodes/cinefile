import providers from "@/data/providers";
import { useQuery } from "@tanstack/react-query";
import APIClient from "@/services/api-client";

export interface Provider {
  logo_path: string;
  provider_name: string;
  provider_id: number;
}

const useProviders = () => {
  const apiClient = new APIClient<Provider>("/watch/providers/movie");

  return useQuery({
    queryKey: ["providers"],
    queryFn: () =>
      apiClient.getAll({ params: { language: "en-US", watch_region: "US" } }),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    initialData: providers,
  });
};

export default useProviders;