import { MovieQuery } from "@/App";
import { Heading } from "@chakra-ui/react";

interface Props {
  movieQuery: MovieQuery;
}

const MovieGridHeading = ({ movieQuery }: Props) => {
  const heading = `${movieQuery.genre?.name || ""} Movies ${movieQuery.provider ? `available on ${movieQuery.provider.provider_name}` : ""}`;

  return (
    <Heading as="h1" size="5xl" padding="10px">
      {heading}
    </Heading>
  );
};

export default MovieGridHeading;
