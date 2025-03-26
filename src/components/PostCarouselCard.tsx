import { Heading, VStack, Text, Flex } from "@chakra-ui/react";
import Carousel from "./Carousel";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const PostCarousel = ({ posts }: { posts: Post[] }) => {
  return (
    <Carousel gap={25} itemsToShow={4}>
      {posts.map((post, index) => (
        <Flex
          key={index}
          justifyContent="space-between"
          flexDirection="column"
          rounded={5}
          flex={1}
          p={5}
          border="1px"
          borderStyle="solid"
          borderColor="border.card"
          bg="layoutTertiary.bg"
        >
          <VStack mb={6}>
            <Heading
              fontSize={{ base: "xl", md: "1xl" }}
              textAlign="left"
              w="full"
              mb={2}
            >
              {post.title}
            </Heading>
            <Text w="full">{post.body}</Text>
          </VStack>
        </Flex>
      ))}
    </Carousel>
  );
};

export default PostCarousel;
