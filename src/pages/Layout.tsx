import NavBar from "@/components/NavBar";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box bg="bg.root">
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default Layout;
