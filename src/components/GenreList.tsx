import useGenres from '@/hooks/useGenres'
import { Badge, Skeleton, Wrap } from '@chakra-ui/react';

const GenreList = () => {
  const { data: genres, error, isLoading } = useGenres();
  const skeletons = [1, 2, 3, 4, 5, 6]

  if (error) return null;

  return (
    <Wrap padding="10px">
        {genres.map (genre => 
        <Skeleton asChild loading={isLoading}>
            <Badge size="md" padding="3" key={genre.id} bg="bg.pill">{genre.name}</Badge>
        </Skeleton>
        )}
    </Wrap>
  )
}

export default GenreList