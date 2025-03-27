import {
  Card,
  Flex,
  VStack,
  Heading,
  Grid,
  HStack,
  Text,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import MovieListPreview from "./MovieListPreview";
import { MovieList } from "@/entities/MovieList";
import { Link } from "react-router-dom";
import { User } from "@/entities/User";
import UserBadge from "./UserBadge";

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
      <Grid
        gap="4"
        columns={{ base: "1", md: "2" }}
        gridTemplateColumns=".5fr 1fr"
      >
        <MovieListPreview listName={list.name} posterUrls={list.posterUrls} />
        <VStack align="flex-start">
          <Heading textTransform="capitalize" lineHeight="110%">
            <Link to={"/lists/" + list.id}>{list.name}</Link>
          </Heading>
          <Text fontSize="sm">{list.description}</Text>
          <UserBadge user={list.user} />
        </VStack>
      </Grid>
    </Card.Root>
  );
};

export default MovieListCard;
