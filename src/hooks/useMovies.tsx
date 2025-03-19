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

const useMovies = (selectedGenre: Genre | null) => {
    return useData<Movie>(
        'movie/now_playing', 
        'results', 
        { language: 'en-US', page: 1 }
    );
};

export default useMovies;