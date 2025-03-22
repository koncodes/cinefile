import List from "@/entities/List";
import { Box, Card, Grid, Image } from "@chakra-ui/react";

interface Props {
  posterUrls: List<string>;
  listName: string;
}

const MovieListPreview = ({ posterUrls, listName }: Props) => {
  console.log(posterUrls);
  return (
    <Card.Root overflow="hidden">
      <Grid
        templateAreas={`"image image" "image image"`}
        gridTemplateColumns={{
          base: `1fr 1fr`,
        }}
        gap="0"
      >
        {posterUrls
          ?.getItems()
          .map((posterUrl) => (
            <Image
              src={`https://media.themoviedb.org/t/p/w440_and_h660_face${posterUrl}`}
              alt={listName}
              objectFit="cover"
              width="100%"
              height="auto"
            />
          ))}
      </Grid>
    </Card.Root>
  );
};

export default MovieListPreview;
