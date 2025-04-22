import List from "@/entities/List";
import { Box, Card, Grid, Image } from "@chakra-ui/react";
import placeholder from "/images/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

interface Props {
  posterUrls: List<string>;
  listName: string;
}

const MovieListPreview = ({ posterUrls, listName }: Props) => {
  const itemsToRender = posterUrls?.getItems().slice(0, 4) || [];
  const filledItems = [...itemsToRender];

  while (filledItems.length < 4) {
    filledItems.push("");
  }

  return (
    <Card.Root
      overflow="hidden"
      height="min-content"
      minW="70px"
      width="100%"
      borderColor="layoutQuaternary.border"
    >
      <Grid templateColumns="repeat(2, 1fr)" gap="0">
        {filledItems.map((posterUrl, index) => (
          <Box
            key={index}
            position="relative"
            width="100%"
            paddingBottom="150%"
            overflow="hidden"
            backgroundImage={posterUrl ? "none" : `url(${placeholder})`} // Use placeholder if no posterUrl
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundColor={posterUrl ? "transparent" : "gray.200"} // Gray background for fallback
            backgroundSize={posterUrl ? "none" : "60%"} // Adjust size for fallback
            shadow="12px 12px 30px 20px rgba(0, 0, 0, .2)"
          >
            {posterUrl && ( // Render Image only if posterUrl is available
              <Image
                src={`https://media.themoviedb.org/t/p/w440_and_h660_face${posterUrl}`}
                alt={`${listName} poster ${index + 1}`}
                objectFit="cover"
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
              />
            )}
          </Box>
        ))}
      </Grid>
    </Card.Root>
  );
};

export default MovieListPreview;
