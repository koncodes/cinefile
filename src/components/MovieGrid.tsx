import useMovies from "@/hooks/useMovies";
import { Box, Button, Center, SimpleGrid, Text } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import MovieCardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";
import React from "react";

const GameGrid = () => {
  const {
    data: movies,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useMovies();
  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <Text>{error.message}</Text>;

  return (
    <Box marginTop="20px">
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
        gap={{ sm: 5, md: 5, lg: 5, xl: 6 }}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <MovieCardContainer key={skeleton}>
              <MovieCardSkeleton />
            </MovieCardContainer>
          ))}
        {movies?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results?.map((movie) => (
              <MovieCardContainer key={movie.id}>
                <MovieCard movie={movie} />
              </MovieCardContainer>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
      {hasNextPage && (
        <Center marginTop="10">
          <Button onClick={() => fetchNextPage()} secondary>
            {isFetchingNextPage ? "Loading..." : "Load More Films"}
          </Button>
        </Center>
      )}
    </Box>
  );
};

export default GameGrid;
