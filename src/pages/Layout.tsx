import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, Outlet, useRouteError } from "react-router-dom";
import img from "/images/ANORA_header.jpg";
import { PiFileXls } from "react-icons/pi";

const Layout = () => {
  const error = useRouteError() || undefined;

  return (
    <>
      <Flex
        bg="bg.root"
        gap="0"
        direction="column"
        maxW="1600px"
        mx="auto"
        shadow="rgba(100, 100, 100, 0.3) 0px 8px 24px"
        minH="calc(100vh)"
      >
        <Nav />
        <Flex direction="column" gap="0" >
          <Box
            h="20rem"
            marginBottom="-16rem"
            position="relative"
            bg={`url('${img}')`}
            bgSize="cover"
            bgRepeat="no-repeat"
            px={0}
            paddingTop=".1px"
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="layoutPrimary.bg"
              opacity=".8"
              zIndex={0}
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient="to-b"
              gradientFrom="transparent"
              gradientTo="layoutPrimary.bg"
              zIndex={0}
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient="to-b"
              gradientFrom="transparent"
              gradientTo="layoutPrimary.bg"
              zIndex={0}
            />
          </Box>
          <Box paddingBottom="16" bg="layoutPrimary.bg">
            <Container maxW="7xl">
              {error && (
                <Box>
                  <Heading>Oops</Heading>
                  <Text>
                    {isRouteErrorResponse(error)
                      ? "This page does not exist."
                      : `An unexpected error has occurred: ${typeof error === "string" ? error : "Unknown error"}`}
                  </Text>
                </Box>
              )}
              <Outlet />
            </Container>
          </Box>
        </Flex>
        <Footer />
      </Flex>
    </>
  );
};

export default Layout;
