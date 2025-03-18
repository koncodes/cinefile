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

    useEffect(() => {
        const controller = new AbortController();

        apiClient
            .get<FetchMovies>('discover/movie', {
                params: {
                    include_adult: false,
                    include_video: false,
                    language: 'en-US',
                    page: 1,
                    sort_by: 'popularity',
                },
                signal: controller.signal
            })
            .then(response => {
                setMovies(response.data.results);
            })
            .catch(error => {
                if (error instanceof CanceledError) return;
                setError(error.message);
            });

        return () => controller.abort();
    }, [])

    return { movies, error }
}

export default useMovies