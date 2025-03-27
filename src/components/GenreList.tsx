import { Genre } from "@/entities/Genre";
import useGenres from "@/hooks/useGenres";
import { useMovieQueryStore } from "@/stores/MovieQueryStore";
import { Badge, Skeleton, Wrap } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

const GenreList = () => {
  const { data: genres, error, isLoading } = useGenres();

  const selectedGenre = useMovieQueryStore((s) => s.movieQuery.genre);
  const setGenre = useMovieQueryStore((s) => s.setGenre);

  if (error) return null;

  const handleGenreClick = (genre: Genre) => {
    if (genre.id === selectedGenre?.id) {
      setGenre(null);
    } else {
      setGenre(genre);
    }
  };

  return (
    <Wrap gap="1.5" rowGap="1.5">
      {genres?.genres?.map((genre) => (
        <Skeleton asChild loading={isLoading} key={genre.id}>
          <Badge
            size="sm"
            bg={genre.id === selectedGenre?.id ? "brand.purple.900" : "bg.pill"}
            color={genre.id === selectedGenre?.id ? "white" : useColorModeValue("black", "white")}
            onClick={() => handleGenreClick(genre)}
            fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
            cursor="pointer"
            variant="subtle"
            paddingInline="5"
          >
            {genre.name}
          </Badge>
        </Skeleton>
      ))}
    </Wrap>
  );
};

export default GenreList;
