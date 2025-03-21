import useGenres from "@/hooks/useGenres";
import { useMovieQueryStore } from "@/store";
import { Badge, Skeleton, Wrap } from "@chakra-ui/react";

const GenreList = () => {
  const { data: genres, error, isLoading } = useGenres();

  const selectedGenre = useMovieQueryStore((s) => s.movieQuery.genre);
  const setGenre = useMovieQueryStore((s) => s.setGenre);

  if (error) return null;

  return (
    <Wrap>
      {genres?.genres?.map((genre) => (
        <Skeleton asChild loading={isLoading} key={genre.id}>
          <Badge
            size="md"
            padding="3"
            bg="bg.pill"
            onClick={() => setGenre(genre)}
            fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
          >
            {genre.name}
          </Badge>
        </Skeleton>
      ))}
    </Wrap>
  );
};

export default GenreList;
