import { useState, useEffect } from "react";
import MovieListCollection from "@/firebase/MovieListCollection";
import {
  Heading,
  Spinner,
  Text,
  Box,
  SimpleGrid,
  Button,
  HStack,
  Badge,
  Span,
  Avatar,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { MovieList } from "@/entities/MovieList";
import { userAuthStore } from "@/stores/AuthStore";
import MovieGridCardSkeleton from "@/components/MovieGridCardSkeleton";
import MovieCard from "@/components/MovieCard";

const MovieListProfilePage = () => {
  const { id } = useParams();
  const authUser = userAuthStore((s) => s.authUser);
  const [movielist, setMovieList] = useState<MovieList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const skeletons = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        const movielistData = await MovieListCollection.getMovieListById(id!);
        if (movielistData) {
          setMovieList(movielistData);
        } else {
          setError("MovieList not found");
        }
      } catch (error) {
        setError("Failed to fetch movielist data");
        console.error("Error fetching movielist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieList();
  }, [id]);

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!movielist) return;

  return (
    <Box>
      <Heading as="h1" size="4xl">
        {movielist.name}
      </Heading>
      <Text my="5">{movielist.description}</Text>

      <HStack
        py="3"
        my="5"
        borderBlock="1px"
        borderColor="border.card"
        borderStyle="solid"
      >
        <Avatar.Root
          colorPalette="brand"
          size="2xs"
          transform="scale(.75)"
          transformOrigin="center"
          position="relative"
          top="-1px"
        >
          <Avatar.Fallback name={movielist.user.displayName} />
          <Avatar.Image src={movielist.user.avatarURL || undefined} />
        </Avatar.Root>
        <Span>List by {movielist.user.displayName}</Span>
        {" • "}
        <Span>
          Updated {""}
          {movielist.updated.toDate().toLocaleString()}
        </Span>
        {movielist.userId == authUser?.id && (
          <Link
            to={"/lists/edit/" + movielist.id}
            style={{ marginLeft: "auto" }}
          >
            <Badge variant="outline" size="md">
              Edit List
            </Badge>
          </Link>
        )}
      </HStack>
      <SimpleGrid
        columns={{ base: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
        gap={{ base: 3, sm: 3, md: 5, lg: 5, xl: 6 }}
      >
        {isLoading &&
          skeletons.map((skeleton) => <MovieGridCardSkeleton key={skeleton} />)}
        {movielist?.movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MovieListProfilePage;
