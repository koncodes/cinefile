import { useState } from "react";
import { Box, Grid, GridItem, HStack } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import MovieGrid from "./components/MovieGrid";
import GenreList from "./components/GenreList";
import { Genre } from "./hooks/useGenres";
import SortBySelector from "./components/SortBySelector";
import ProviderSelector from "./components/ProviderSelector";
import { Provider } from "./hooks/useProviders";
import SearchInput from "./components/SearchInput";

export interface MovieQuery {
  genre: Genre | null;
  sortBy: string | null;
  provider: Provider | null;
  searchText: string | null;
}

function App() {
  const [movieQuery, setMovieQuery] = useState<MovieQuery>({} as MovieQuery);

  const updateMovieQuery = (newQuery: Partial<MovieQuery>) => {
    if (newQuery.searchText !== undefined) {
      setMovieQuery({ searchText: newQuery.searchText, genre: null, sortBy: null, provider: null });
    } else {
      setMovieQuery((prevQuery) => ({ ...prevQuery, ...newQuery, searchText: null }));
    }
  };

  return (
    <Box className="App" bg="bg.root">
      <Grid
        templateAreas={{
          base: `"nav" "main" "footer"`,
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        <GridItem area="main">
          <Box padding="10px">
            <SearchInput searchText={movieQuery.searchText} onSearch={(searchText) => updateMovieQuery({ searchText })} />
          </Box>
          <HStack align="flex-start" padding="10px" gap="20">
            <GenreList
              selectedGenre={movieQuery.genre}
              onSelectGenre={(genre) => updateMovieQuery({ genre })}
            />
            <HStack>
              <SortBySelector
                selectedSort={movieQuery.sortBy}
                onSelectSort={(sortBy) => updateMovieQuery({ sortBy })}
              />
              <ProviderSelector
                selectedProvider={movieQuery.provider}
                onSelectProvider={(provider) => updateMovieQuery({ provider })}
              />
            </HStack>
          </HStack>
          <MovieGrid movieQuery={movieQuery} />
        </GridItem>
        <GridItem area="footer">Nav</GridItem>
      </Grid>
    </Box>
  );
}

export default App;