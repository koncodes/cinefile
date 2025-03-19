import apiClient from "@/services/api-client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface Genre {
    id: number;
    name: string;
}

interface FetchGenres {
    genres: Genre[];
}

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        setIsLoading(true);
        apiClient
            .get<FetchGenres>('/genre/movie/list', {
                params: {
                    language: 'en',
                    api_key: import.meta.env.VITE_API_KEY,
                },
                signal: controller.signal
            })
            .then(response => {
                setGenres(response.data.genres);
                setIsLoading(false);
            })
            .catch(error => {
                if (error instanceof CanceledError) return;
                setError(error.message);
                setIsLoading(false);
            });

        return () => controller.abort();
    }, [])

    return { genres, error, isLoading }
}

export default useGenres;