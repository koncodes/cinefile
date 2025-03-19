import useGenres, { Genre } from '@/hooks/useGenres'
import { Badge, Skeleton, Wrap } from '@chakra-ui/react';

interface Props {
  onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({ onSelectGenre }: Props) => {
  const { data: genres, error, isLoading } = useGenres();
  const skeletons = [1, 2, 3, 4, 5, 6]

  if (error) return null;

  return (
    <Wrap padding="10px">
        {genres.map (genre => 
        <Skeleton asChild loading={isLoading} key={genre.id}>
            <Badge size="md" padding="3" bg="bg.pill" onClick={() => onSelectGenre(genre)}>{genre.name}</Badge>
        </Skeleton>
        )}
    </Wrap>
  )
}

export default GenreList