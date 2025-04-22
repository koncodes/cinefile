import { Movie } from "@/entities/Movie";
import useMovies from "@/hooks/useMovies";
import { MovieQuery } from "@/stores/MovieQueryStore";
import { Box, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

interface Props {
  onSelectMovie: (movie: Movie) => void;
  selectedMovie: Movie | null;
}

const SearchMovie = ({ onSelectMovie, selectedMovie }: Props) => {
  const [query, setQuery] = useState<MovieQuery>({});

  const {
    data: movies,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useMovies(query);

  const fetchedMovieCount =
    movies?.pages.reduce(
      (total, page) => total + (page.results?.length ?? 0),
      0
    ) || 0;

  const handleMovieSelect = (movie: Movie) => {
    onSelectMovie(movie);
    setQuery({
      ...query,
      searchText: `${movie.title} (${new Date(movie.release_date).getFullYear()})`,
    });
  };

  useEffect(() => {
    if (!selectedMovie) {
      setQuery({ ...query, searchText: "" });
    }
  }, [selectedMovie]);

  return (
    <Box w="100%">
      <AutoComplete
        emptyState={
          <Text color="gray.500" paddingInline={4}>
            No movies found.
          </Text>
        }
      >
        {({ isOpen }: { isOpen: boolean }) => (
          <>
            <AutoCompleteInput
              variant="outline"
              borderRight="0"
              outline="0"
              borderEndRadius="0"
              placeholder="Search movies..."
              value={query.searchText || ""}
              onChange={(e) => {
                setQuery({ ...query, searchText: e.target.value });
              }}
              autoComplete="off"
            />
            {isOpen && (
              <AutoCompleteList
                maxH="300px"
                overflow="auto"
                id="scrollable-movie-list"
              >
                <InfiniteScroll
                  dataLength={fetchedMovieCount}
                  hasMore={!!hasNextPage}
                  next={() => fetchNextPage()}
                  loader={<Spinner />}
                  scrollableTarget="scrollable-movie-list"
                  style={{ overflow: "visible" }}
                >
                  {movies?.pages.map((page, index) => (
                    <React.Fragment key={index}>
                      {page.results?.map((movie) => (
                        <AutoCompleteItem
                          key={movie.id}
                          value={`${movie.title} ${movie.id}`}
                          onClick={() => handleMovieSelect(movie)}
                        >
                          {movie.title}
                          {movie.release_date &&
                            `(${new Date(movie.release_date).getFullYear()})`}
                        </AutoCompleteItem>
                      ))}
                    </React.Fragment>
                  ))}
                </InfiniteScroll>
              </AutoCompleteList>
            )}
          </>
        )}
      </AutoComplete>
    </Box>
  );
};

export default SearchMovie;
