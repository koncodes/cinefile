import { HStack, Switch } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch.Root
        size="xs"
        checked={colorMode === "dark"}
        onCheckedChange={toggleColorMode}
        gap="3"
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
