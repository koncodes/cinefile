import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex bg="bg.root" h="full" minH="100vh" gap="0" direction="column">
      <NavBar />
      <Box
        paddingInline={{ base: "5", md: "10" }}
        paddingBlock="10"
        bg="layoutPrimary.bg"
      >
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
