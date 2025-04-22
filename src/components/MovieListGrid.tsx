import { MovieList } from '@/entities/MovieList'
import { SimpleGrid } from '@chakra-ui/react'
import MovieListCard from './MovieListCard';

interface Props {
    movieLists: MovieList[];
}

const MovieListGrid = ({ movieLists }: Props) => {
  return (
    <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3 }}
        gap="5"
      >
        {movieLists.length === 0 ? (
          <p>No public custom lists found.</p>
        ) : (
          <>
            {movieLists.map((list) => (
              <MovieListCard key={list.id} list={list} />
            ))}
          </>
        )}
      </SimpleGrid>
  )
}

export default MovieListGrid