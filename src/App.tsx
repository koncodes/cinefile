import { Button, ButtonGroup, Grid, GridItem } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
import GameGrid from "./components/GameGrid"
import GenreList from "./components/GenreList"


function App() {
  
  return (
    <div className="App">
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
    </div>
  )
}

export default App
