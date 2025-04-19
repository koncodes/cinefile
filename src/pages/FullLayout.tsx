import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex
      bg="bg.root"
      h="full"
      minH="100vh"
      gap="0"
      direction="column"
      maxW="1600px"
      mx="auto"
      shadow="rgba(100, 100, 100, 0.3) 0px 8px 24px"
    >
      <Nav />
      <Box bg="layoutPrimary.bg">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
