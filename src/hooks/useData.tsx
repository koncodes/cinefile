import apiClient from "@/services/api-client";
import { Axios, AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";

interface FetchResponse<T> {
    results?: T[];
    genres?: T[];
    [key: string]: any; 
}

const useData = <T extends unknown>( 
    endpoint: string,
    key: string,
    requestConfig?: AxiosRequestConfig,
    deps?: any[]
) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        setIsLoading(true);
        apiClient
            .get<FetchResponse<T>>(endpoint, {
                signal: controller.signal,
                ...requestConfig
            })
            .then(response => {
                setData(response.data[key] || []);
                setIsLoading(false);
            })
            .catch(error => {
                if (error instanceof CanceledError) return;
                setError(error.message);
                setIsLoading(false);
            });

        return () => controller.abort();
    }, deps ? [...deps] : []);

    return { data, error, isLoading };
};

export default useData;