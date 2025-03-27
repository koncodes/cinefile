import {
  Box,
  Container,
  VStack,
  Heading,
  Span,
  Text,
  Image,
  Card,
  Flex,
} from "@chakra-ui/react";
import usePopular from "@/hooks/usePopular";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieCarousel = () => {
  const { data, error, isLoading } = usePopular();

  const movies =
    data?.results && Array.isArray(data.results)
      ? data.results.slice(0, 10)
      : [];

  if (isLoading) return null;
  if (error) throw error;

  return (
    <Carousel gap={25} itemsToShow={5}>
      {movies?.map((movie, index) => (
        <Flex
          key={index}
          direction="column"
        >
          <MovieCard movie={movie} />
        </Flex>
      ))}
    </Carousel>
  );
};

export default MovieCarousel;
