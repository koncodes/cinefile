import { useState } from "react"
import { Box, Grid, GridItem } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
import GameGrid from "./components/GameGrid"
import GenreList from "./components/GenreList"
import { Genre } from "./hooks/useGenres"

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  
  return (
    <Box className="App" bg="bg.root">
      <Grid templateAreas={{
        base: `"nav" "main" "footer"`,
      }}>
        <GridItem area="nav" >
          <NavBar />
        </GridItem>
        <GridItem area="main">
          <GenreList selectedGenre={selectedGenre} onSelectGenre={(genre) => setSelectedGenre(genre)}/>
          <GameGrid selectedGenre={selectedGenre}/>
        </GridItem>
        <GridItem area="footer">Nav</GridItem>
      </Grid>
    </Box>
  )
}

export default App
