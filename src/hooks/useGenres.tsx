import useData from "./useData";

export interface Genre {
    id: number;
    name: string;
}

const useGenres = () => useData<Genre>(
    '/genre/movie/list',
    'genres', 
    { params: { language: 'en-US' } }
);

export default useGenres;