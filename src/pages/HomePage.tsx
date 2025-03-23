import PostCarousel from "@/components/CarouselCard";
import Header from "@/components/Header";
import { Box, Container, Heading, Span, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

const HomePage = () => {
  const samplePosts = [
    {
      userId: 1,
      id: 6,
      title: "incredible view from mountain top",
      body: "The panoramic vista stretched before me, valleys and peaks bathed in golden light. Standing at the summit after hours of climbing, I felt a sense of accomplishment unlike anything else. The crisp mountain air filled my lungs as clouds drifted below my feet.",
    },
    {
      userId: 2,
      id: 7,
      title: "mastering the art of sourdough bread",
      body: "After months of failed attempts, my sourdough starter finally achieved perfect activity. The loaf rose beautifully in the oven, developing a crackling crust and tender, airy crumb. The tangy flavor profile was exactly what I'd been striving for all this time.",
    },
    {
      userId: 3,
      id: 8,
      title: "discovering hidden bookshops in the city",
      body: "Down a narrow alleyway, nestled between modern buildings, I found a charming bookstore that seemed frozen in time. Shelves reached to the ceiling, packed with rare editions and forgotten classics. The elderly owner shared stories of famous authors who once frequented the shop.",
    },
    {
      userId: 1,
      id: 9,
      title: "night photography in the urban jungle",
      body: "The city transforms after dark, neon lights reflecting off rain-slicked streets. Long exposure shots capture the streaming headlights and create light trails that tell stories of urban movement. Each photograph reveals a different character of the metropolis.",
    },
    {
      userId: 2,
      id: 10,
      title: "sustainable garden transformation project",
      body: "What began as a barren backyard has become a thriving ecosystem. Native plants attract local pollinators, while the rainwater collection system ensures sustainable irrigation. The vegetable beds now produce enough to share with neighbors, creating community bonds through homegrown food.",
    },
  ];

  return (
    <>
      <Header></Header>
      <Box borderBottom="1px" borderStyle="solid" borderColor="border.card">
        <Container
          paddingBlock="4em"
          maxW="7xl"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <VStack maxWidth="600px" paddingBottom="8" gap="4">
            <Heading textAlign="center" fontSize={{ base: "3xl", md: "4xl" }}>
              What to <Span color="splash.text">Watch</Span>
            </Heading>
            <Text textAlign="center">
              Below are some popular movies from this week. Sign up to add to
              Watchlist.
            </Text>
          </VStack>
          <PostCarousel posts={samplePosts} />
        </Container>
      </Box>

      <Container
        paddingBlock="4em"
        maxW="7xl"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <VStack maxWidth="600px" paddingBottom="8" gap="4">
          <Heading textAlign="center" fontSize={{ base: "3xl", md: "4xl" }}>
            <Span color="splash.text">Reviews</Span> From this week
          </Heading>
          <Text textAlign="center">
            Below are some popular reviews and lists from this week. Sign up to
            create your own.
          </Text>
        </VStack>
        <PostCarousel posts={samplePosts} />
      </Container>
    </>
  );
};

export default HomePage;
