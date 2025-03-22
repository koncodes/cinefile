import GenreList from "@/components/GenreList";
import MovieGrid from "@/components/MovieGrid";
import MovieGridHeading from "@/components/MovieGridHeading";
import ProviderSelector from "@/components/ProviderSelector";
import SearchInput from "@/components/SearchInput";
import SortBySelector from "@/components/SortBySelector";
import { Box, Button, Grid, GridItem, HStack } from "@chakra-ui/react";
import React from "react";

const MoviesPage = () => {
  return (
    <>
      <MovieGridHeading />
      <Grid
        templateAreas={{
          base: `"search search" "provider provider" "sort clear"`,
          sm: `"search search search" "provider sort clear"`,
          md: `"search provider sort clear"`,
        }}
        gridTemplateColumns={{
          base: `1fr 1fr`,
          sm: `1fr min-content min-content`,
          md: `1fr min-content min-content min-content`,
        }}
        gap="3"
      >
        <GridItem area="search">
          <SearchInput />
        </GridItem>
        <GridItem area="provider">
          <ProviderSelector />
        </GridItem>
        <GridItem area="sort">
          <SortBySelector />
        </GridItem>
        <GridItem area="clear">
          <Button
            size="sm"
            variant="outline"
            width="100%"
            justifyContent="space-between"
          >
            Clear All
          </Button>
        </GridItem>
      </Grid>
      <HStack align="flex-start" gap="20" marginTop={5}>
        <GenreList />
      </HStack>
      <MovieGrid />
    </>
  );
};

export default MoviesPage;
