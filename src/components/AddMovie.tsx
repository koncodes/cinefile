import { useState } from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import { Movie } from "@/entities/Movie";
import SearchMovie from "./SearchMovie";

interface Props {
  onAddMovie: (movie: Movie) => void;
}

const AddMovie = ({ onAddMovie }: Props) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleAddMovie = () => {
    if (selectedMovie) {
      onAddMovie(selectedMovie);
      setSelectedMovie(null);
    }
  };

  return (
    <HStack gap="0" w="100%">
      <SearchMovie
        onSelectMovie={handleSelectMovie}
        selectedMovie={selectedMovie}
      />
      <Button
        onClick={handleAddMovie}
        disabled={!selectedMovie}
        primary
        borderStartRadius="0"
        h="42px"
      >
        Add to List
      </Button>
    </HStack>
  );
};

export default AddMovie;
