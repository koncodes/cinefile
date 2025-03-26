import { Card, Skeleton, SkeletonText } from "@chakra-ui/react";

const MovieGridCardSkeleton = () => {
  return (
    <Card.Root
      h="100%"
      justifyContent="space-between"
      flexDirection="column"
      border="1px"
      borderStyle="solid"
      borderColor="border.card"
      bg="layoutTertiary.bg"
      padding="0"
      overflow="hidden"
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
      }}
    >
      <Skeleton height="250px" />
      <Card.Body>
        <SkeletonText />
      </Card.Body>
    </Card.Root>
  );
};

export default MovieGridCardSkeleton;
