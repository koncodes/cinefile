import useMovies from "@/hooks/useMovies";
import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "./MovieCard";
import MovieCardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";

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
  const fetchedMovieCount =
    movies?.pages.reduce(
      (total, page) => total + (page.results?.length ?? 0),
      0
    ) || 0;

  return (
    <InfiniteScroll
      dataLength={fetchedMovieCount}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<Spinner />}
    >
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 4, lg: 5, xl: 6 }}
        gap={{ sm: 5, md: 5, lg: 5, xl: 6 }}
        padding="10px"
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
    </InfiniteScroll>
  );
};

export default GameGrid;
