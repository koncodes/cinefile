import { Box, Grid, GridItem, HStack } from "@chakra-ui/react";
import GenreList from "./components/GenreList";
import MovieGrid from "./components/MovieGrid";
import MovieGridHeading from "./components/MovieGridHeading";
import NavBar from "./components/NavBar";
import ProviderSelector from "./components/ProviderSelector";
import SearchInput from "./components/SearchInput";
import SortBySelector from "./components/SortBySelector";

function App() {
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
          <MovieGridHeading />
          <Box padding="10px">
            <SearchInput />
          </Box>
          <HStack align="flex-start" padding="10px" gap="20">
            <GenreList />
            <HStack>
              <SortBySelector />
              <ProviderSelector />
            </HStack>
          </HStack>
          <MovieGrid />
        </GridItem>
        <GridItem area="footer">Nav</GridItem>
      </Grid>
    </Box>
  );
}

export default App;
