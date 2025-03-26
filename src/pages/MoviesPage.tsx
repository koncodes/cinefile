import ClearAllButton from "@/components/ClearAllButton";
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
      <Grid width={{md: "fit-content"}}
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
        gap={{ base: "4", md: "2" }}
        paddingTop="4"
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
          <ClearAllButton />
        </GridItem>
      </Grid>
      <HStack align="flex-start" gap="20" marginTop={4} paddingBottom="4">
        <GenreList />
      </HStack>
      <MovieGrid />
    </>
  );
};

export default MoviesPage;
