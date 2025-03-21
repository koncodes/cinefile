import useMovie from "@/hooks/useMovie";
import { Heading, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movie, isLoading, error } = useMovie(id!);

  if (isLoading) return <Spinner />;
  if (error || !movie) throw error;

  return (
    <>
      <Heading>{movie.title}</Heading>
      <Text>{movie.overview}</Text>
    </>
  );
};

export default MovieDetailPage;
