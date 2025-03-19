import { useState } from "react"
import { Box, Grid, GridItem, HStack } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
import MovieGrid from "./components/MovieGrid"
import GenreList from "./components/GenreList"
import { Genre } from "./hooks/useGenres"
import SortBySelector from "./components/SortBySelector"

export interface MovieQuery {
  genre: Genre | null;
  sortBy: string | null;
}

function App() {
  // const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  // const [selectedSort, setSelectedSort] = useState<string | null>(null);

  const [movieQuery, setMovieQuery] = useState<MovieQuery>({} as MovieQuery);
  
  return (
    <Box className="App" bg="bg.root">
      <Grid templateAreas={{
        base: `"nav" "main" "footer"`,
      }}>
        <GridItem area="nav" >
          <NavBar />
        </GridItem>
        <GridItem area="main">
          <HStack align="top" padding="10px" gap="20">
            <GenreList selectedGenre={movieQuery.genre} onSelectGenre={(genre) => setMovieQuery({ ...movieQuery, genre})}/>
            <SortBySelector selectedSort={movieQuery.sortBy} onSortChange={(sortBy) => setMovieQuery({ ...movieQuery, sortBy})}/>
          </HStack>
          <MovieGrid movieQuery={movieQuery} />
        </GridItem>
        <GridItem area="footer">Nav</GridItem>
      </Grid>
    </Box>
  )
}

export default App
