import {
  Button,
  chakra,
  Flex,
  Heading,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";
import arrow from "/images/arrow.svg";

const Header = () => {
  return (
    <Flex
      marginInline={{ base: "0", md: "0" }}
      marginBlock="0"
      marginBottom="0"
      bg="black"
      color="white"
      backgroundImage="url('/images/ANORA_header.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      display="flex"
      align="center"
      justify="center"
      minH="500px"
      borderBottom="1px"
      borderStyle="solid"
      borderColor="layoutSecondary.border"
    >
      <VStack maxWidth="600px" padding="5" gap="6">
        <Heading
          textAlign="center"
          fontSize={{ base: "5xl", md: "6xl" }}
          lineHeight="110%"
        >
          Find Your Next
          <br />
          Flick on Cinefile.
        </Heading>
        <p>
          Keep a record of the movies you've watched. Bookmark the ones you plan
          to see. Share recommendations with friends. Discover new favorites
          along the way!
        </p>
        <HStack gap="0">
          <Button primary>Get started for free</Button>
          <Button
            secondary
            _hover={{
              "& svg": {
                fill: "buttonSecondary.hoverText",
              },
            }}
          >
            <chakra.svg
              fill="buttonSecondary.text"
              viewBox="0 0 27 14.22"
              w="28px"
            >
              <path d="M.38,7.65c-.26-.13-.38-.31-.38-.54s.12-.41.38-.54h23.65c-1.29-.96-2.29-2.12-3-3.48-.45-.87-.75-1.74-.9-2.59h0s0-.07-.02-.11c0,0,0-.01,0-.02,0-.02,0-.05,0-.06,0-.2.18-.3.54-.3.22,0,.36.02.42.07.06.05.11.15.15.31.05.36.15.74.3,1.12.4,1.22,1.06,2.3,1.99,3.26s2.01,1.64,3.24,2.05c.16.06.24.16.24.3s-.08.24-.24.3c-1.23.41-2.31,1.1-3.24,2.05-.92.95-1.59,2.04-1.99,3.26-.13.38-.23.74-.3,1.09-.04.18-.09.3-.15.34-.06.05-.2.07-.42.07-.38,0-.57-.1-.57-.3,0-.05.06-.28.16-.68.56-2.27,1.83-4.13,3.78-5.58H.38Z" />
            </chakra.svg>
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default Header;
