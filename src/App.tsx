import { Box, Button, ButtonGroup, Grid, GridItem } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
import GameGrid from "./components/GameGrid"
import GenreList from "./components/GenreList"


function App() {
  
  return (
    <Box className="App" bg="bg.root">
      <Grid templateAreas={{
        base: `"nav" "main" "footer"`,
      }}>
        <GridItem area="nav" >
          <NavBar />
        </GridItem>
        <GridItem area="main">
          <GenreList />
          <GameGrid />
        </GridItem>
        <GridItem area="footer">Nav</GridItem>
      </Grid>
    </Box>
  )
}

export default App
