import { useMovieQueryStore } from "@/stores/MovieQueryStore";
import { Heading } from "@chakra-ui/react";

const MovieGridHeading = () => {
  const selectedGenre = useMovieQueryStore((s) => s.movieQuery.genre);
  const selectedProvider = useMovieQueryStore((s) => s.movieQuery.provider);

  const heading = `${selectedGenre?.name || ""} Movies`;

  return (
    <>
      <Heading as="h1" size="5xl" marginBottom={0} fontWeight="normal">
        {heading}
      </Heading>
      <Heading
        as="h2"
        size="lg"
        marginBottom={3}
        fontFamily="body"
        opacity=".6"
        textTransform="uppercase"
        letterSpacing=".025em"
      >
        {selectedProvider
          ? `Available on ${selectedProvider.provider_name}`
          : "Now Available"}
      </Heading>
    </>
  );
};

export default MovieGridHeading;
