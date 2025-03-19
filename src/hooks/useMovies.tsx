import { MovieQuery } from '@/App';
import useData from './useData';
import { Genre } from './useGenres';

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
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

const useMovies = (movieQuery: MovieQuery) => {
    const endpoint = movieQuery.searchText ? 'search/movie' : 'discover/movie';

    return useData<Movie>(
        endpoint,
        'results',
        {
            params: {
                language: 'en-US',
                page: 1,
                'vote_count.gte': movieQuery.searchText ? undefined : 300, 
                watch_region: 'US',
                with_genres: movieQuery.searchText ? undefined : movieQuery.genre?.id, 
                sort_by: movieQuery.searchText ? undefined : movieQuery.sortBy, 
                with_watch_providers: movieQuery.searchText ? undefined : movieQuery.provider?.provider_id, 
                query: movieQuery.searchText || undefined,
            },
        },
        [movieQuery]
    );
};

export default useMovies;