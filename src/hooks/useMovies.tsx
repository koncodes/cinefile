import apiClient from '@/services/api-client';
import { CanceledError } from 'axios';
import React, { useEffect, useState } from 'react';

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: number;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface FetchMovies {
    page: number;
    results: Movie[];
}

const useMovies = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        setIsLoading(true);
        apiClient
            .get<FetchMovies>('movie/now_playing', {
                params: {
                    language: 'en-US',
                    page: 1,
                    api_key: import.meta.env.VITE_API_KEY,
                },
                signal: controller.signal
            })
            .then(response => {
                setMovies(response.data.results);
                setIsLoading(false);
            })
            .catch(error => {
                if (error instanceof CanceledError) return;
                setError(error.message);
                setIsLoading(false);
            });

        return () => controller.abort();
    }, [])

    return { movies, error, isLoading }
}

export default useMovies