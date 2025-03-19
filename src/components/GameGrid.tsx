import useMovies from '@/hooks/useMovies';
import { SimpleGrid, Text } from '@chakra-ui/react';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';
import MovieCardContainer from './MovieCardContainer';


const GameGrid = () => {
    const {movies, error, isLoading} = useMovies();
    const skeletons = [1, 2, 3, 4, 5, 6]

    return (
        <>
            {error && <Text>{error}</Text>}
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 5, xl: 6}} gap={{ sm: 5, md: 5, lg: 5, xl: 6}} padding='10px'>
                {isLoading && skeletons.map(skeleton => 
                    <MovieCardContainer>
                        <MovieCardSkeleton key={skeleton} />
                    </MovieCardContainer>
                )}
                {movies.map(movie => 
                    <MovieCardContainer>
                        <MovieCard key={movie.id} movie={movie} />
                    </MovieCardContainer>
                )}
            </SimpleGrid>
        </>
    )
}

export default GameGrid