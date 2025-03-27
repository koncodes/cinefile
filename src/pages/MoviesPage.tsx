import ClearAllButton from "@/components/ClearAllButton";
import GenreList from "@/components/GenreList";
import MovieGrid from "@/components/MovieGrid";
import MovieGridHeading from "@/components/MovieGridHeading";
import ProviderSelector from "@/components/ProviderSelector";
import SearchInput from "@/components/SearchInput";
import SortBySelector from "@/components/SortBySelector";
import { Provider } from "@/entities/Provider";
import useProviders from "@/hooks/useProviders";
import { useMovieQueryStore } from "@/stores/MovieQueryStore";
import { Grid, GridItem, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const MoviesPage = () => {
  const { data: providers, error } = useProviders();
  const { provider_id } = useParams<{ provider_id?: string }>();
  const setProvider = useMovieQueryStore((s) => s.setProvider);
  console.log(providers, provider_id);

  useEffect(() => {
    if (providers && provider_id) {
      console.log(providers, provider_id);
      const foundProvider = providers.results?.find(
        (provider: Provider) => provider.provider_id === parseInt(provider_id)
      );

      if (foundProvider) {
        setProvider(foundProvider);
      } else {
        console.warn(`Provider with ID ${provider_id} not found.`);
      }
    }
  }, [provider_id]);

  return (
    <>
      <MovieGridHeading />
      <Grid
        width={{ md: "fit-content" }}
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
