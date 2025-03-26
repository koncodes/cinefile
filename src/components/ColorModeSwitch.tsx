import { HStack, Switch } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Switch.Root
      size="md"
      checked={colorMode === "dark"}
      onCheckedChange={toggleColorMode}
      gap="5"
    >
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label fontSize="lg" fontWeight="normal">
        {colorMode === "dark" ? "Dark Mode" : "Light Mode"}
      </Switch.Label>
    </Switch.Root>
  );
};

export default ColorModeSwitch;
