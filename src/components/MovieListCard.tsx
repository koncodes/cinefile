import { Card, Flex, VStack, Heading } from "@chakra-ui/react";
import MovieListPreview from "./MovieListPreview";
import { MovieList } from "@/entities/MovieList";
import { Link } from "react-router-dom";

interface Props {
  list: MovieList;
}

const MovieListCard = ({ list }: Props) => {
  return (
    <Card.Root key={list.id} maxWidth="50vw" padding="3">
      <Flex gap="4">
        <MovieListPreview listName={list.name} posterUrls={list.posterUrls} />
        <VStack align="flex-start">
          <Heading textTransform="capitalize"><Link to={"/lists/" + list.id}>{list.name}</Link></Heading>
          <p>{list.id}</p>
          <p>{list.description}</p>
          <p>Created by: {list.userId}</p>
        </VStack>
      </Flex>
    </Card.Root>
  );
};

export default MovieListCard;
