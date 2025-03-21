import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/react.svg";
import ColorModeSwitch from "./ColorModeSwitch";
import Authentication from "./Authentication";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} boxSize="40px" />
      <HStack>
        <Authentication />
        <ColorModeSwitch />
      </HStack>
    </HStack>
  );
};

export default NavBar;
