import { Movie } from "@/entities/Movie";
import {
  Box,
  Card,
  Heading,
  HStack,
  Image,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import placeholder from "/images/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
import Rating from "./Rating";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Card.Root
      h="100%"
      justifyContent="space-between"
      flexDirection="column"
      border="1px"
      borderStyle="solid"
      borderColor="border.card"
      bg="layoutTertiary.bg"
      padding="0"
      overflow="hidden"
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
      }}
    >
      {movie.poster_path ? (
        <Image
          src={`https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`}
          alt={movie.title}
          objectFit="cover"
          width="100%"
          height="auto"
        />
      ) : (
        <Box
          display="block"
          width="100%"
          height="auto"
          aspectRatio="2/3"
          position="relative"
          top="0"
          left="0"
          backgroundImage={`url(${placeholder})`}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundColor="gray.200"
          backgroundSize="60%"
        />
      )}
      <Card.Body gap="2" padding="3" paddingBottom="3">
        <HStack gap="2.5" alignItems="flex-start">
          <Rating score={movie.vote_average} />
          <VStack alignItems="flex-start" gap="0" fontSize=".9em">
            <Link to={"/films/" + movie.id}>
              <Text lineHeight="130%" fontWeight="bold">
                {movie.title}
              </Text>
            </Link>
            <Text opacity=".6">
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          </VStack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default MovieCard;
