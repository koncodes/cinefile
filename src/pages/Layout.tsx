import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { isRouteErrorResponse, Outlet, useRouteError } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const error = useRouteError() || undefined;

  return (
    <Flex bg="bg.root" h="full" minH="100vh" gap="0" direction="column">
      <Nav />
      <Box
        paddingInline={{ base: "5", md: "10" }}
        paddingBlock="10"
        bg="layoutPrimary.bg"
      >
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
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
