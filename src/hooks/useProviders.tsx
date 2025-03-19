import useData from "./useData";

export interface Provider {
    logo_path: string;
    provider_name: string;
    provider_id: number;
}

const useProviders = () => useData<Provider>(
    '/watch/providers/movie',
    'results', 
    { params: { language: 'en-US', watch_region: 'US' } }
);

export default useProviders;