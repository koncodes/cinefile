import useMovies from '@/hooks/useMovies';
import { SimpleGrid, Text } from '@chakra-ui/react';
import MovieCard from './MovieCard';
import MovieCardContainer from './MovieCardContainer';
import { Genre } from '@/hooks/useGenres';
import MovieCardSkeleton from './MovieCardSkeleton';

interface Props {
    selectedGenre: Genre | null;
}

const GameGrid = ({ selectedGenre }: Props) => {
    const { data: movies, error, isLoading } = useMovies(selectedGenre);
    const skeletons = [1, 2, 3, 4, 5, 6]

    return (
        <>
            {error && <Text>{error}</Text>}
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 5, xl: 6}} gap={{ sm: 5, md: 5, lg: 5, xl: 6}} padding='10px'>
                {isLoading && skeletons.map(skeleton => 
                    <MovieCardContainer key={skeleton}>
                        <MovieCardSkeleton />
                    </MovieCardContainer>
                )}
                {movies.map(movie => 
                    <MovieCardContainer key={movie.id}>
                        <MovieCard movie={movie} />
                    </MovieCardContainer>
                )}
            </SimpleGrid>
        </>
    )
}

export default GameGrid