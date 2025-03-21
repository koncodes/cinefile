import GenreList from "@/components/GenreList";
import MovieGrid from "@/components/MovieGrid";
import MovieGridHeading from "@/components/MovieGridHeading";
import ProviderSelector from "@/components/ProviderSelector";
import SearchInput from "@/components/SearchInput";
import SortBySelector from "@/components/SortBySelector";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

const HomePage = () => {
  return (
    <>
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
    </>
  );
};

export default HomePage;
