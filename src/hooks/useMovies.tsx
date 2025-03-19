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
    return useData<Movie>(
        'discover/movie', 
        'results', 
        { params: { 
            language: 'en-US', 
            page: 1, 
            'vote_count.gte': 400, 
            with_genres: movieQuery.genre?.id,
            sort_by: movieQuery.sortBy
         }},
        [movieQuery]
    );
};

export default useMovies;