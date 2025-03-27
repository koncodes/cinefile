import List from "@/entities/List";
import { Box, Card, For, Grid, Image } from "@chakra-ui/react";
import placeholder from "/images/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

interface Props {
  posterUrls: List<string>;
  listName: string;
}

const MovieListPreview = ({ posterUrls, listName }: Props) => {
  return (
    <Card.Root
      overflow="hidden"
      height="min-content"
      minW="70px"
      width="100%"
      borderColor="layoutQuaternary.border"
    >
      <Grid templateColumns="repeat(2, 1fr)" gap="0">
        <For
          each={posterUrls?.getItems().slice(0, 4) || []}
          fallback={[1, 2, 3, 4].map((item, index) => (
            <Box
              key={index}
              position="relative"
              width="100%"
              paddingBottom="150%"
              backgroundImage={`url(${placeholder})`}
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundColor="gray.200"
              backgroundSize="60%"
              shadow="12px 12px 30px 20px rgba(0, 0, 0, .2)"
            />
          ))}
        >
          {(posterUrl, index) => (
            <Box
              key={index}
              position="relative"
              width="100%"
              paddingBottom="150%"
              overflow="hidden"
            >
              <Image
                src={`https://media.themoviedb.org/t/p/w440_and_h660_face${posterUrl}`}
                alt={`${listName} poster ${index + 1}`}
                objectFit="cover"
                position="absolute"
                top=""
                left="0"
                width="100%"
                height="100%"
                key={index}
                shadow="12px 12px 30px 20px rgba(0, 0, 0, .2)"
              />
            </Box>
          )}
        </For>
      </Grid>
    </Card.Root>
  );
};

export default MovieListPreview;
