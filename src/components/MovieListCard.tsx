import { Card, VStack, Heading, Grid, Text, Badge, Span } from "@chakra-ui/react";
import MovieListPreview from "./MovieListPreview";
import { MovieList } from "@/entities/MovieList";
import { Link, useParams } from "react-router-dom";
import UserBadge from "./UserBadge";
import { userAuthStore } from "@/stores/AuthStore";
import { IoMdLock } from "react-icons/io";
import ExcerptText from "./ExcerptText";
const Lock = IoMdLock as React.ElementType;

interface Props {
  list: MovieList;
}

const MovieListCard = ({ list }: Props) => {
  const authUser = userAuthStore((s) => s.authUser);

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
            <Link to={"/lists/" + list.id}>
              {list.name}
              {list?.privacy === "private" && (
                <>
                  {" "}
                  <Badge
                    variant="solid"
                    fontFamily="Poppins"
                    textTransform="uppercase"
                    size="sm"
                    position="relative"
                    top="-2px"
                    px="1"
                    py="1"
                  >
                    <Lock />
                  </Badge>
                </>
              )}
            </Link>
          </Heading>
          <Text fontSize="xs">
            {list.movies.length} films
            {authUser?.id === list.userId && (
              <>
                {" "}
                •{" "}
                <Link
                  to={"/lists/edit/" + list.id}
                  style={{ marginLeft: "auto" }}
                >
                  edit
                </Link>
              </>
            )}
          </Text>
          <Span fontSize="sm">
            <ExcerptText limit={20}>{list.description}</ExcerptText>
          </Span>
          <UserBadge user={list.user} />
        </VStack>
      </Grid>
    </Card.Root>
  );
};

export default MovieListCard;
