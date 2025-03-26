import { Card, Flex, VStack, Heading } from "@chakra-ui/react";
import MovieListPreview from "./MovieListPreview";
import { MovieList } from "@/entities/MovieList";
import { Link } from "react-router-dom";

interface Props {
  list: MovieList;
}

const MovieListCard = ({ list }: Props) => {
  return (
    <Card.Root
      key={list.id}
      h="100%"
      justifyContent="space-between"
      flexDirection="column"
      border="1px"
      borderStyle="solid"
      borderColor="layoutQuaternary.border"
      bg="layoutQuaternary.bg"
      padding="3"
      overflow="hidden"
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
      }}
    >
      <Flex gap="4">
        <MovieListPreview listName={list.name} posterUrls={list.posterUrls} />
        <VStack align="flex-start">
          <Heading textTransform="capitalize">
            <Link to={"/lists/" + list.id}>{list.name}</Link>
          </Heading>
          <p>{list.description}</p>
          <p>Created by: {list.userId}</p>
        </VStack>
      </Flex>
    </Card.Root>
  );
};

export default MovieListCard;
