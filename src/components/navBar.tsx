import React from 'react';
import { Box, HStack, Image, Text } from '@chakra-ui/react';
import logo from '../assets/react.svg';
import { ColorModeButton } from "@/components/ui/color-mode";
import ColorModeSwitch from './ColorModeSwitch';

const NavBar = () => {
  return (
    <HStack justifyContent='space-between' padding='10px'> 
      <Image src={logo} boxSize='40px' />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;