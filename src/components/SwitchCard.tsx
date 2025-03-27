import { Box, Flex, Switch } from "@chakra-ui/react";
import { disableInstantTransitions } from "framer-motion";
import React from "react";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  on?: boolean;
}

const SwitchCard = ({ children, disabled = false, on = false }: Props) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor="border.card"
      overflow="hidden"
      p={5}
      width="100%"
    >
      <Flex align={"start"} gap={2} justifyContent="space-between">
        {children}
        <Switch.Root
          disabled={disabled}
          {...(on ? { defaultChecked: true } : {})}
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label />
        </Switch.Root>
      </Flex>
    </Box>
  );
};

export default SwitchCard;
