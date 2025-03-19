import useData from "./useData";

interface Genre {
    id: number;
    name: string;
}

const useGenres = () => useData<Genre>(
    '/genre/movie/list',
    'genres', 
    { language: 'en' }
);

export default useGenres;