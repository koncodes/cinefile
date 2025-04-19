import Header from "@/components/Header";
import MovieCarousel from "@/components/MovieCarousel";
import ReviewCarousel from "@/components/ReviewCarousel";
import { Box, Container, Heading, Span, Text, VStack } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box overflow="hidden">
      <Header></Header>
      <Box
        borderBottomWidth="1px"
        borderStyle="solid"
        borderColor="border.card"
      >
        <Container variant="homePage">
          <VStack paddingBottom="9" gap="4">
            <Heading textAlign="center" fontSize={{ base: "3xl", md: "2.6em" }}>
              What to <Span color="splash.text">Watch</Span>
            </Heading>
            <Text textAlign="center">
              Below are some popular movies from this week. Sign up to add to
              Watchlist.
            </Text>
          </VStack>
          <MovieCarousel />
        </Container>
      </Box>

      <Container variant="homePage">
        <VStack paddingBottom="9" gap="4">
          <Heading textAlign="center" fontSize={{ base: "3xl", md: "2.6em" }}>
            <Span color="splash.text">Reviews</Span> From this week
          </Heading>
          <Text textAlign="center">
            Below are some popular reviews and lists from this week. Sign up to
            create your own.
          </Text>
        </VStack>
        <ReviewCarousel />
      </Container>
    </Box>
  );
};

export default HomePage;
