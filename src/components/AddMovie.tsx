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
    <HStack>
      <SearchMovie
        onSelectMovie={handleSelectMovie}
        selectedMovie={selectedMovie}
      />
      <Button onClick={handleAddMovie} disabled={!selectedMovie}>
        Add to List
      </Button>
    </HStack>
  );
};

export default AddMovie;
