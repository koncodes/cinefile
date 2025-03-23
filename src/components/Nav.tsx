import {
  Avatar,
  Badge,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Menu,
  Portal,
} from "@chakra-ui/react";
import logo from "/images/cinefile.svg";
import ColorModeSwitch from "./ColorModeSwitch";
import AuthenticationPopover from "./AuthenticationPopover";
import { userAuthStore } from "@/stores/AuthStore";
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import LogoutButton from "./LogoutButton";
import { ColorModeButton, useColorMode } from "./ui/color-mode";

import { LuMoon, LuSun } from "react-icons/lu";

const LuMoonIcon = LuMoon as React.ElementType;
const LuSunIcon = LuSun as React.ElementType;

const NavBar = () => {
  const authUser = userAuthStore((s) => s.authUser);
  const ChevronDownIcon = BsChevronDown as React.ElementType;
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack
      justifyContent="space-between"
      paddingInline={{ base: "5", md: "10" }}
      paddingBlock="5"
      bg="layoutSecondary.bg"
      borderBottom="1px"
      borderStyle="solid"
      borderColor="layoutSecondary.border"
    >
      <Link to={"/"}>
        <Image src={logo} height="8" />
      </Link>
      <HStack>
        <HStack gap="4" paddingRight="4">
          <Button variant="plain" size="sm" padding="0" asChild>
            <Link to={"/"}>Home</Link>
          </Button>
          <Button variant="plain" size="sm" padding="0" asChild>
            <Link to={"/films"}>Films</Link>
          </Button>
          <Button variant="plain" size="sm" padding="0" asChild>
            <Link to={"/lists"}>Lists</Link>
          </Button>
          <Badge variant="outline"  size="xs">
            <ColorModeButton
              variant="plain"
              _hover={{
                "& svg": {
                  stroke: "color.white",
                },
              }}
            />
          </Badge>
        </HStack>
        {authUser && (
          <HStack gap="0">
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button primary>
                  {authUser.displayName} <ChevronDownIcon />
                </Button>
              </Menu.Trigger>
              <Portal closeOnSelect={false}>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="Profile" asChild>
                      <Link to={"/users/" + authUser.id}>Profile</Link>
                    </Menu.Item>
                    <Menu.Item value="NewList" asChild>
                      <Link to={"/lists/add"}>Add List</Link>
                    </Menu.Item>
                    <Menu.Item value="Logout">
                      <LogoutButton />
                    </Menu.Item>
                    <Menu.Item>
                      <Box
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <ColorModeSwitch />
                      </Box>
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <Avatar.Root shape="full" size="lg">
              <Avatar.Fallback />
              <Avatar.Image src={authUser.avatarURL} />
            </Avatar.Root>
          </HStack>
        )}
        {!authUser && <AuthenticationPopover />}
      </HStack>
    </HStack>
  );
};

export default NavBar;
