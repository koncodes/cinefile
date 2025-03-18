import useMovies from '@/hooks/useMovies';
import { SimpleGrid, Text } from '@chakra-ui/react';
import MovieCard from './MovieCard';


const GameGrid = () => {
    const {movies, error} = useMovies();

    return (
        <>
            {error && <Text>{error}</Text>}
            <SimpleGrid columns={{ sm: 1, md: 4, lg: 5, xl: 6}} gap={{ sm: 5, md: 5, lg: 5, xl: 6}} padding='10px'>
                {movies.map(movie => 
                    <MovieCard key={movie.id} movie={movie} />
                )}
            </SimpleGrid>
        </>
    )
}

export default GameGrid