import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, Outlet, useRouteError } from "react-router-dom";

const Layout = () => {
  const error = useRouteError() || undefined;

  return (
    <Flex bg="bg.root" h="full" minH="100vh" gap="0" direction="column">
      <Nav />
      <Box paddingBlock="10" bg="layoutPrimary.bg">
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
      <Footer />
    </Flex>
  );
};

export default Layout;
