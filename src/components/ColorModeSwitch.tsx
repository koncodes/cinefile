import { HStack, Switch } from "@chakra-ui/react";
import {
    ColorModeButton,
    DarkMode,
    LightMode,
    useColorMode,
    useColorModeValue,
  } from "@/components/ui/color-mode"
import React from "react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch.Root 
        checked={colorMode === "dark"} 
        onCheckedChange={toggleColorMode}
      >
        <Switch.HiddenInput />
        <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
        <Switch.Label>
          {colorMode === "dark" ? "Dark Mode" : "Light Mode"}
        </Switch.Label>
      </Switch.Root>
    </HStack>
  );
};

export default ColorModeSwitch;
