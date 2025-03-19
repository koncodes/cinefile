import useMovies from '@/hooks/useMovies';
import { SimpleGrid, Text } from '@chakra-ui/react';
import MovieCard from './MovieCard';
import MovieCardContainer from './MovieCardContainer';
import { Genre } from '@/hooks/useGenres';
import MovieCardSkeleton from './MovieCardSkeleton';
import { MovieQuery } from '@/App';

interface Props {
    movieQuery: MovieQuery;
}

const GameGrid = ({ movieQuery }: Props) => {
    const { data: movies, error, isLoading } = useMovies(movieQuery);
    const skeletons = [1, 2, 3, 4, 5, 6]

    if (error) return <Text>{error}</Text>

    return (
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
    )
}

export default GameGrid