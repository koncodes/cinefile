import useMovieQueryStore from "@/store";
import { Heading } from "@chakra-ui/react";

const MovieGridHeading = () => {
  const selectedGenre = useMovieQueryStore((s) => s.movieQuery.genre);
  const selectedProvider = useMovieQueryStore((s) => s.movieQuery.provider);

  const heading = `${selectedGenre?.name || ""} Movies ${selectedProvider ? `available on ${selectedProvider.provider_name}` : ""}`;

  return (
    <Heading as="h1" size="5xl" padding="10px">
      {heading}
    </Heading>
  );
};

export default MovieGridHeading;
